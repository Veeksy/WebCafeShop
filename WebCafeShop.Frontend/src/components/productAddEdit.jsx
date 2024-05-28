import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, FloatingLabel, Form, Row, Table, Toast } from 'react-bootstrap';
import {API_URL} from '../constants'
import { Pagination, TextField, Skeleton, Alert, AlertTitle } from "@mui/material";
import { NavLink, useNavigate, useParams } from 'react-router-dom';

export const ProductAddEdit = () => {

    const params = useParams();
    const navigate = useNavigate()
    const [product, setProduct] = useState();
    const [countries, setCountries] = useState([]);

    useEffect(() => { 
        axios.get(API_URL + 'product/GetProduct?idProduct=' + params.idProduct, {
            headers: 'Access-Control-Allow-Headers","*"'
        }).then(res => {
            setProduct(res.data)
        })
    }, [])

    
    useEffect(() => { 
        axios.get(API_URL + 'product/GetCountries', {
            headers: 'Access-Control-Allow-Headers","*"'
        }).then(res => {
            setCountries(res.data)
        })
    }, [])

    const saveProduct = () => {
        axios.post(API_URL + 'product/SaveProduct', product, {
            headers: 'Access-Control-Allow-Headers","*"'
        }).then(res => alert(res.data)).catch(err =>alert(err))
    }
    
    return (
        <React.Fragment>
                <Card>
                    <Card.Header>
                        <Card.Body>
                            <div className='pageBody'>
                                <Row>
                                    <Col>
                                    <FloatingLabel label="Наименование">
                                        <Form.Control type='text' value={product?.name} onChange={(e) => setProduct({...product, name: e.target.value})}></Form.Control>
                                    </FloatingLabel>
                                    </Col>
                                    <Col>
                                    <FloatingLabel label="Срок годности">
                                        <Form.Control type='text' value={product?.expirationDate}></Form.Control>
                                    </FloatingLabel>
                                    </Col>
                                </Row>
                                <br/>
                                <Row>
                                <Col>
                                    <FloatingLabel label="Вес">
                                        <Form.Control type='text' value={product?.weight}></Form.Control>
                                    </FloatingLabel>
                                    </Col>
                                    <Col>
                                    <FloatingLabel label="Количество">
                                        <Form.Control type='number' readOnly value={product?.count}></Form.Control>
                                    </FloatingLabel>
                                    </Col>
                                </Row>
                                <br/>
                                <Row>
                                <FloatingLabel label="Страна">
                                        <Form.Select value={product?.country}>
                                            <option value={0}>
                                                Не указано
                                            </option>
                                            {countries?.map((item) => <option value={item.id}>
                                                {item.country}
                                                </option>
                                            )}
                                        </Form.Select>
                                    </FloatingLabel>
                                </Row>
                                <br/>
                                <Row>
                                <FloatingLabel label="Описание">
                                        <Form.Control as='textarea' type='text' readOnly value={product?.description}></Form.Control>
                                    </FloatingLabel>
                                </Row>
                                <br/>
                                <Row>
                                    <Col md='auto'>
                                        <Button className='defaultBtn' onClick={() => navigate(-1)}>Назад</Button>
                                    </Col>
                                    
                                    <Col md='auto'>
                                        <Button className='specialBtn' onClick={() => saveProduct()}>Сохранить</Button>
                                    </Col>
                                </Row>
                            </div>
                        </Card.Body>
                    </Card.Header>
                </Card>
        </React.Fragment>
    )
}