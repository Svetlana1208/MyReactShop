import React, { useEffect, useState, useContext } from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import star from '../assets/star.png';
import { useParams, useNavigate } from 'react-router-dom';
import { Context } from '../App';
import { setDoc, doc, deleteDoc } from "firebase/firestore"; 
import { ADMIN, SHOP_ROUTE } from '../utils/consts';

export default function DevicePage() {
  const {devData, user, cartRef, getCart, devicesList, getDevices} = useContext(Context);
  const [currentDevice, setCurrentDevice] = useState({});
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentDevice(devData.find(device => Number(device.id) === Number(id)));
  }, [devData, id])

  function addToCart() {
    if(user) {
      setDoc(doc(cartRef, `${currentDevice.title}`), currentDevice);
    } else console.log('no user');
    getCart();
    navigate(SHOP_ROUTE);
  }

  async function deleteDevice() {
    await deleteDoc(doc(devicesList, `${currentDevice.title}`));
    getDevices();
    navigate(SHOP_ROUTE);
  }

  return (
    <Container className='mt-3'>
      <div className='d-flex flex-wrap'>
        <Col md={4}>
          <Image width={400} height={320} src={currentDevice.image} />
        </Col>
        <Col md={4}>
          <div className='d-flex flex-column align-items-center'>
            <h3>{currentDevice.brand}</h3>
            <h2>{currentDevice.title}</h2>
            <div 
              className='d-flex align-items-center justify-content-center'
              style={{background: `url(${star}) no-repeat center center`, width: 200, height: 200, backgroundSize: 'cover', fontSize: 42}}>
                {currentDevice.rating}
            </div>
            <h3>{currentDevice.category}</h3>
          </div>
        </Col>
        <Col md={4} className=''>
          <Card
            className='d-flex flex-column align-items-center justify-content-around'
            style={{width: 320, height: 320, fontSize: 32, border: '5px solid lightgray'}}>
              <h3>Від: {currentDevice.price} грн.</h3>
              {(user && user.email !== ADMIN) ?
              <Button variant={"outline-dark"} onClick={addToCart}>Додати у кошик</Button>
              :
              <Button variant={"outline-dark"} disabled>Додати у кошик</Button>
              }
              {(user && user.email === ADMIN) &&
              <Button variant={"outline-dark"} onClick={deleteDevice}>Видалити товар</Button>
              }
            </Card>
        </Col>
      </div>
      <Row className='d-flex flex-column m-3'>
        <h1>Характеристики</h1>
        <p>{currentDevice.description}</p>
      </Row>
    </Container>
  )
}