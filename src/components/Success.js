import React from 'react';
import { useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Context } from '../App';

export default function Success() {
 const {modalSuccessVisible, setModalSuccessVisible} = useContext(Context);
  return (
    <Modal
        show={modalSuccessVisible}
        onHide={setModalSuccessVisible}
        size="lg"
        centered
    >
        <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter" className='mx-auto'>
                Ваше замовлення успішно відправлено!
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Дякуємо за замовлення. Очікуйте, з вами зв'яжеться менеджер для уточнення даних.
        </Modal.Body>
        <Modal.Footer>
            <Button variant={'outline-danger'} onClick={() => setModalSuccessVisible(false)}>Закрити</Button>
        </Modal.Footer>
    </Modal>
  );
}
