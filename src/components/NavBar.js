import React, { useContext } from 'react';
import { Context } from '../App';
import { Nav, Navbar, Button, Container } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, ORDER_ROUTE} from '../utils/consts';
import {useAuthState} from 'react-firebase-hooks/auth';
import CartModal from './CartModal';


const NavBar = observer (({userCart}) => {
    const {auth, setModalVisible,  modalVisible} = useContext(Context);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    function signOut() {
        auth.signOut();
    }

  return (
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
            <NavLink style={{marginLeft: 50, color:'blue'}} to='/shop'>MyShop</NavLink>
            {user ?
                <Nav className='ms-auto' style={{ gap: 10}}>
                    <p style={{margin: 'auto 0', color: 'blue'}}>{user.email}</p>
                    {user.email === 'admin@admin.ua' ?
                        <div style={{display:'flex', gap: 10}}>
                            <Button variant="outline-primary" onClick={() => navigate(ORDER_ROUTE)}>Заказы</Button>
                            <Button variant="outline-primary" onClick={() => navigate(ADMIN_ROUTE)}>Админ панель</Button>
                        </div>
                        :
                        <Button variant="outline-primary" onClick={() => setModalVisible(true)}>Корзина</Button>
                    }
                    <Button variant="outline-primary" onClick={() => signOut()}>Выйти</Button>
                </Nav>
                :
                <Nav className='ms-auto' style={{color:'blue', gap: 10}}>
                    <Button variant="outline-primary" onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                    <Button variant="outline-primary" onClick={() => navigate(REGISTRATION_ROUTE)}>Регистрация</Button>
                </Nav>
            }
            <CartModal userCart={userCart} show={modalVisible} onHide={() => setModalVisible(false)}/>
        </Container>
    </Navbar>
    );
})

export default NavBar;