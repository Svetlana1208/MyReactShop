import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import React, { useState, createContext, useEffect } from 'react';
import {getAuth} from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { collection, getFirestore, getDocs, doc} from "firebase/firestore";
import {useAuthState} from 'react-firebase-hooks/auth';
import { ADMIN, LIMIT } from "./utils/consts";

const app = initializeApp({
  apiKey: "AIzaSyCMxIB1fiZxQHWZKMI6YG4i3GolR9LXPn8",
  authDomain: "onlineshop-8265c.firebaseapp.com",
  projectId: "onlineshop-8265c",
  storageBucket: "onlineshop-8265c.appspot.com",
  messagingSenderId: "714671852303",
  appId: "1:714671852303:web:8745bcfcd46364ee504c7a",
  measurementId: "G-JJ3JCF18GP"
});
export const db = getFirestore(app);
export const auth = getAuth(app);
export const devicesList = collection(db, "data");
export const usersCarts = collection(db, "usersCarts");
export const ordersList = collection(db, "orders");
export const usersList = collection(db, "usersList");

export const Context = createContext(null);

export let devices = [];
let typesAll = [];
let brandsAll = [];
export const limit = LIMIT;
export let cartRef;
let userRef;

const devicesData = await getDocs(collection(db, "data"));
devicesData.forEach((device) => {
  devices.push(device.data());
});
const brandsData = await getDocs(collection(db, "brands"));
brandsData.forEach((brand) => {
  brandsAll.push(brand.data());
});  
const typesData = await getDocs(collection(db, "types"));
typesData.forEach((type) => {
  typesAll.push(type.data());
});

function App() {
  const [devData, setDevData] = useState(devices);
  const [types, setTypes] = useState(typesAll);
  const [brands, setBrands] = useState(brandsAll);
  const [selectedType, setSelectedType] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [user] = useAuthState(auth);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userCart, setUserCart] = useState([]);
  const [userOrders, setUserOrders] = useState([]);

  async function getCart() {
      setIsLoading(true);
      let currentCart = [];
      const data = await getDocs(collection(userRef, "cart"));
      data.forEach((device) => {
        currentCart.push(device.data());
      });
      setUserCart(currentCart);
      setIsLoading(false)
  }

  async function getOrder() {
    setIsLoading(true);
    let orders = [];
    const ordersData = await getDocs(collection(db, "orders"));
    ordersData.forEach((order) => {
      orders.push(order.data());
    });
    setUserOrders(orders);
    setIsLoading(false)
  }

  async function getDevices() {
    let devices = [];
    const devicesData = await getDocs(collection(db, "data"));
    devicesData.forEach((device) => {
      devices.push(device.data());
    });
    setDevData(devices)
}

  useEffect(() => {
    if(user) {
      userRef = doc(usersCarts, `${user.email}`);
      cartRef = collection(userRef, "cart");
      getCart();
    }
    if(user && user.email === ADMIN) {
      getOrder();
    }
  }, [user])


  return (
    <Context.Provider value={{
      db,
      auth,
      user,
      devices,
      getDevices,
      types,
      setTypes,
      brands,
      setBrands,
      limit,
      selectedType,
      setSelectedType,
      selectedBrand, 
      setSelectedBrand,
      devData,
      setDevData,
      currentPage, 
      setCurrentPage,
      cartRef, 
      modalVisible, 
      setModalVisible,
      getCart,
      setUserCart,
      devicesList, 
      usersList,
      ordersList,
      getOrder,
      isLoading,
      setIsLoading,
    }}>
      <BrowserRouter>
        <NavBar userCart={userCart}/>
        <AppRouter userCart={userCart} userOrders={userOrders}/>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;