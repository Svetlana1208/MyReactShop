import React from 'react';
import OrderItem from '../components/OrderItem';
import ListGroup from 'react-bootstrap/ListGroup';

export default function Orders({userOrders}) {
  return (
      <div className='d-block'>
        <ListGroup as="ol" numbered>
          {userOrders.length ?
            userOrders.map((order) => (
                <OrderItem key={order.id} order={order} userOrders={userOrders} />
                ))
            :
            <h2 className='mt-5 mx-auto'>Заказов нет</h2>
          }
        </ListGroup>
    </div>
)
}