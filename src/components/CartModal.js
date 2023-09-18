import React from 'react';
import Cart from './Cart';
import {Button} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useContext } from 'react';
import { Context } from '../App';
import { doc, setDoc, deleteDoc } from "firebase/firestore";


export default function CartModal({show, onHide, userCart}) {
    const {ordersList, user, cartRef, getCart, setUserCart, setModalVisible} = useContext(Context);
  
    function sendOrder() {
        const idOrder = Date.now();
        const dateOrder = new Date().toLocaleString();
        userCart.map((device) => {
          setDoc(doc(ordersList, `${idOrder + " " + device.title}`), {
            dateOrder: `${dateOrder}`,
            idOrder: `${idOrder}`,
            customer: `${user.email}`,
            id: Date.now() + `${device.id}`,
            image: `${device.image}`,
            title: `${device.title}`,
            price: Number(`${device.price}`),
            quantity: `${device.quantity}`
          }); 
          deleteDoc(doc(cartRef, `${device.title}`));
          return userCart
        })
        getCart();    
        setUserCart([]);
        setModalVisible(false);
      }
    
  return (
    <Modal
        show={show}
        onHide={onHide}
        size="lg"
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter" className='mx-auto'>
                Корзина
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Cart userCart={userCart}/>
        </Modal.Body>
        <Modal.Footer>
            <Button variant={'outline-danger'} onClick={() => onHide()}>Закрыть</Button>
            <Button variant={'outline-success'} onClick={() => sendOrder()}>Отправить заказ</Button>
        </Modal.Footer>
    </Modal>
    )
}