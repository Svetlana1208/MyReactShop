import React from 'react';
import { Card, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import star from '../assets/star.png';
import {useNavigate} from 'react-router-dom';
import { DEVICE_ROUTE } from '../utils/consts';


export default function DeviceItem({device}) {
    const navigate = useNavigate();
  return (
        <Col md={3} className={'mt-3'} onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
                <Image width={150} height={150} src={device.image}/>
                <div className='mt-1 d-flex justify-content-between align-items-center'>
                    <div>{device.title}</div>
                    <div className='d-flex align-items-center'>
                        <div className='text-black-50'>{device.rating}</div>
                        <Image src={star} width={17}/>
                    </div>
                </div>
            </Card>
        </Col>
  )
}