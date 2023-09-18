import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useContext } from 'react';
import { Context } from '../App';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore"; 

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {auth, usersList} = useContext(Context);

function registration() {
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      setDoc(doc(usersList, `${email}`), {
        id: `${email}`,
        value: `${email}`,
      });
      navigate(SHOP_ROUTE);
    })
    .catch((error) => {
      alert(error.message);
    });
}

function login() {
  signInWithEmailAndPassword(auth, email, password)
  .then(() => {
    navigate(SHOP_ROUTE);
    })
  .catch((error) => {
    alert(error.message);
  });
}

return (
    <Container
      className='d-flex justify-content-center align-items-center'
      style={{height: window.innerHeight - 154}}
      >
      <Card style={{width: 600}} className='p-5'>
        <h2 className='m-auto'>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
        <Form className='d-flex flex-column'>
          <Form.Control 
            className="mt-3"
            placeholder="Введите ваш e-mail..."
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Form.Control 
            className="mt-3"
            placeholder="Введите ваш пароль..."
            value={password}
            onChange={e => setPassword(e.target.value)}
            type='password'
          />
          <div className='d-flex justify-content-between pt-3'>
            {isLogin ? 
              <div>
                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
              </div>
              :
              <div>
                Нет аккаунта? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
              </div>
            }
            {isLogin ? 
            <Button variant="outline-primary" onClick={login}>
            Войти
            </Button>
            :
            <Button variant="outline-primary" onClick={registration}>
            Регистрация
            </Button>
            }
          </div>
        </Form>
      </Card>
    </Container>
  )
}
