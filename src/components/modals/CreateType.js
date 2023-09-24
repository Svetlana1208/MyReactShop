import React, { useContext, useState } from 'react';
import {Button, Form} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { Context } from '../../App';
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom';
import { SHOP_ROUTE } from '../../utils/consts';

export default function CreateType({show, onHide}) {
    const {db, setTypes} = useContext(Context)
    const [value, setValue] = useState('');
    const navigate = useNavigate();

    async function getTypes() {
        let types = [];
        const typesData = await getDocs(collection(db, "types"));
        typesData.forEach((type) => {
          types.push(type.data());
        });
        setTypes(types)
    }

    function addType() {
        addDoc(collection(db, "types"), {
            id: `${value}`,
            value: `${value}`,
          });         
        setValue('');
        onHide();
        getTypes();
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
                    Додати новий тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введіть назву типу"}>
                    </Form.Control>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'outline-danger'} onClick={onHide}>Закрити</Button>
                {value
                ?
                <Button variant={'outline-success'} onClick={addType}>Додати</Button>
                :
                <Button variant={'outline-success'} disabled onClick={addType}>Додати</Button>
                }
            </Modal.Footer>
    </Modal>
    )
}