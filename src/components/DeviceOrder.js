import React, {useContext, useEffect, useState} from 'react';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import { Context } from '../App';
import { FaTrash } from 'react-icons/fa';
import { doc, deleteDoc } from "firebase/firestore";


export default function DeviceOrder({device, userCart, setTotal}) {
    const { cartRef, getCart} = useContext(Context);
    const [quantity, setQuantity] = useState(device.quantity);
    const [cost, setCost] = useState(device.price);
    
    async function deleteOrder(device) {
        await deleteDoc(doc(cartRef, `${device.title}`));
        getCart();
    }
      
    useEffect(() => {
        setCost(device.price * device.quantity);
    }, [quantity, userCart, device.quantity, device.price])

    function onQuantityChange(e) {
        e.preventDefault();
        setQuantity(e.target.value);
        device.quantity = e.target.value;
        setCost(device.price * device.quantity);
        let sum = userCart.reduce((totalAll, device) => device.price * device.quantity + totalAll, 0);
        setTotal(sum);
    }

  return (
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-center"
        >

        <div className='container'>
            <div className='row align-items-center'>
                <div className='col'>
                    <Image width={70} height={70} src={device.image}/>
                </div>
                <div className='col-4'>
                    <div className=" me-auto fw-bold">{device.title}</div>
                </div>
                <div className='col-2'>
                    <div>{device.price} грн.</div>
                </div>
                <div className='col'>
                    <Form>
                        <Form.Control
                            style={{width: 80}}
                            value={device.quantity}
                            onChange={e => onQuantityChange(e)}
                            type='number'
                            min={1}
                            >
                        </Form.Control>
                    </Form>
                </div>
                <div className='col-2'>
                    <div>{cost} грн.</div>
                </div>
                <div className='col'>
                    <FaTrash style={{cursor: 'pointer'}} onClick={() => deleteOrder(device)}/>
                </div>
            </div>
        </div>
      </ListGroup.Item>
  )
}