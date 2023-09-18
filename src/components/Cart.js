import React, { useEffect, useState } from 'react';
import DeviceOrder from './DeviceOrder';
import ListGroup from 'react-bootstrap/ListGroup';

export default function Cart({userCart}) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let sum = userCart.reduce((totalAll, device) => device.price * device.quantity + totalAll, 0);
    setTotal(sum);
  }, [userCart]);

    return (
      <div>
        <div className='d-block'>
          <ListGroup as="ol" numbered>
            {userCart.length ? 
              userCart.map((device) => (
                  <DeviceOrder userCart={userCart} key={device.id} device={device} setTotal={setTotal}/>
                  ))
              :
              <h2>Корзина пуста</h2>
            }
            <b>Общая сумма заказа: {total} грн.</b>
          </ListGroup>
        </div>
      </div>
    )
}