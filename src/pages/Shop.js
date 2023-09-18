import React from 'react';
import { Container } from 'react-bootstrap';
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import TypeBar from '../components/TypeBar';
import BrandBar from '../components/BrandBar';
import DeviceList from '../components/DeviceList';
import Pages from '../components/Pages';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../App';
import Loading from '../components/Loading';

export default observer(function Shop() {
  const {isLoading} = useContext(Context);
  return (
    <Container>
      <Row className='mt-2'>
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          {isLoading
          ?
          <Loading />
          :
          <>
            <BrandBar />
            <DeviceList />
            <Pages />
          </>          
          }
        </Col>
      </Row>
    </Container>
  )
})