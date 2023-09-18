import React, { useContext, useState } from 'react';
import {Button, Form} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { Context } from '../../App';
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom';
import { SHOP_ROUTE } from '../../utils/consts';


export default function CreateBrand({show, onHide}) {
    const {db, setBrands} = useContext(Context)
    const [value, setValue] = useState('');
    const navigate = useNavigate();

    function addBrand() {
        addDoc(collection(db, "brands"), {
            id: `${value}`,
            value: `${value}`,
          });         
        setValue('');
        onHide();
        getBrands();
        navigate(SHOP_ROUTE);
    }

    async function getBrands() {
        let brands = [];
        const brandsData = await getDocs(collection(db, "brands"));
        brandsData.forEach((brand) => {
            brands.push(brand.data());
        });  
        setBrands(brands)
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
            Добавить новый бренд
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form>
            <Form.Control
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder={"Введите название бренда"}>
            </Form.Control>
        </Form>
    </Modal.Body>
    <Modal.Footer>
        <Button variant={'outline-danger'} onClick={onHide}>Закрыть</Button>
        <Button variant={'outline-success'} onClick={addBrand}>Добавить</Button>
    </Modal.Footer>
</Modal>
)
}