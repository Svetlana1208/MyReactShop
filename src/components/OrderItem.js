import React, { useContext } from 'react';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import { FaTrash } from 'react-icons/fa';
import { Context } from '../App';
import { doc, deleteDoc } from "firebase/firestore";

export default function OrderItem({order}) {
    const {ordersList, getOrder} = useContext(Context);

    async function confirmOrder(order) {
        await deleteDoc(doc(ordersList, `${order.idOrder + " " + order.title}`));
        getOrder()
    }
      
    return (
        <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-center"
        >

            <div className='container'>
                <div className='row align-items-center'>
                    <div className='col-3'>
                        <div>Заказ № <b>{order.idOrder}</b></div>
                        <div>от {order.dateOrder}</div>
                        <div>Покупатель: <i>{order.customer}</i></div>
                    </div>
                    <div className='col'>
                        <Image width={70} height={70} src={order.image}/>
                    </div>
                    <div className='col-4'>
                        <div className=" me-auto fw-bold">{order.title}</div>
                    </div>
                    <div className='col-2'>
                        <div>{order.price} грн.</div>
                    </div>
                    <div className='col'>
                        <div>{order.quantity}</div>
                    </div>
                    <div className='col'>
                        <FaTrash style={{cursor: 'pointer'}} onClick={() => confirmOrder(order)}/>
                    </div>
                </div>
            </div>
        </ListGroup.Item>
    )
}