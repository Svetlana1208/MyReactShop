import React, { useContext } from 'react';
import OrderItem from '../components/OrderItem';
import ListGroup from 'react-bootstrap/ListGroup';
import { Context } from '../App';

export default function Orders() {
  const {userOrders} = useContext(Context);
  return (
      <div className='d-block'>
        <ListGroup as="ol" numbered>
          {userOrders.length ?
            userOrders.map((order) => (
                <OrderItem key={order.id} order={order} userOrders={userOrders} />
                ))
            :
            <h2 className='mt-5 mx-auto'>Замовлень немає</h2>
          }
        </ListGroup>
    </div>
)
}