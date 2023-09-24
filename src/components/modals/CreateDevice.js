import React, { useContext, useState } from 'react';
import {Alert, Button, Dropdown, Form, FormControl} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { Context } from '../../App';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { setDoc, doc} from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom';
import { SHOP_ROUTE } from '../../utils/consts';

export default function CreateDevice({show, onHide}) {
    const navigate = useNavigate();
    const {types, brands, devicesList, getDevices} = useContext(Context);
    const [device, setDevice] = useState({
        title: '', 
        price: '', 
        description: '', 
        rating: '', 
        image: '',
        brand: '',
        type: '',
        quantity: 1
    });

    function addDevice () {
        setDoc(doc(devicesList, `${device.title}`), {
            id: Date.now(),
            brand: `${device.brand}`,
            category: `${device.type}`,
            description: `${device.description}`,
            image: `${device.image}`,
            price: Number(`${device.price}`),
            rating: Number(`${device.rating}`),
            title: `${device.title}`,
            quantity: Number(`${device.quantity}`)
          }); 
          setDevice({
            title: '', 
            price: '', 
            description: '', 
            rating: '', 
            image: '',
            brand: '',
            type: '',
            quantity: 1
        })
        onHide();
        getDevices();
        navigate(SHOP_ROUTE);
    }

  return (
    <Modal
        show={show}
        onHide={onHide}
        size="lg"
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Додати товар
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Dropdown className='mt-2 mb-2'>
                    <DropdownToggle>{device.type || "Оберіть тип"}</DropdownToggle>
                    <DropdownMenu>
                        {types.map(type =>
                            <DropdownItem key={type.id} onClick={() => setDevice({...device, type: type.value})}>{type.value}</DropdownItem>
                            )}
                    </DropdownMenu>
                </Dropdown>
                <Dropdown className='mt-2 mb-2'>
                    <DropdownToggle>{device.brand || "Оберіть бренд"}</DropdownToggle>
                    <DropdownMenu>
                        {brands.map(brand =>
                            <DropdownItem key={brand.id} onClick={() => setDevice({...device, brand: brand.value})}>{brand.value}</DropdownItem>
                            )}
                    </DropdownMenu>
                </Dropdown>
                <FormControl
                    className='mt-3'
                    value={device.title}
                    onChange={(e) => setDevice({...device, title: e.target.value})}
                    placeholder='Введіть назву товару'    
                />
                <FormControl
                    className='mt-3'
                    value={device.description}
                    onChange={(e) => setDevice({...device, description: e.target.value})}
                    placeholder='Введіть опис товару'    
                />
                <FormControl
                    className='mt-3'
                    value={device.rating}
                    onChange={(e) => setDevice({...device, rating: e.target.value})}
                    placeholder='Введіть рейтинг товару'    
                />
                <FormControl
                    className='mt-3'
                    value={device.price}
                    onChange={(e) => setDevice({...device, price: e.target.value})}
                    placeholder='Введіть вартість товару'
                    type='number'    
                />
                <FormControl
                    className='mt-3'
                    value={device.image}
                    onChange={(e) => setDevice({...device, image: e.target.value})}
                    placeholder='Введіть посилання на зображення товару'    
                />
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant={'outline-danger'} onClick={onHide}>Закрити</Button>
            {
            device.type && device.brand && device.title && device.description && device.rating && device.price && device.image
            ?
            <Button variant={'outline-success'} onClick={addDevice}>Додати</Button>
            :
            <Alert>Заповніть всі поля</Alert>
            }
        </Modal.Footer>
    </Modal>
    )
}