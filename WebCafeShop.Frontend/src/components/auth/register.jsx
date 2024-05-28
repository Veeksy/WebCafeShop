import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, FloatingLabel, Form, Row, Table, Toast } from 'react-bootstrap';

import { Pagination, TextField, Skeleton, Alert, AlertTitle } from "@mui/material";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../../constants';

export const RegisterPage = () => {

    const [user, setUser] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(API_URL + 'auth/GetUser', {
            headers: 'Access-Control-Allow-Headers","*"'
        }).then(res => setUser(res.data))
    }, [])


    const Register = () => {
        if (user.username === null || user.password === null){
            alert("Введите логин и пароль")
        }
        else{
            axios.post(API_URL + 'auth/Register', user, {
                headers: 'Access-Control-Allow-Headers","*"'
            }).then(res => {
                if (res.data === null){
                    alert("Такой пользователь уже существует. Выберете другой логин")    
                }
                else{
                    sessionStorage.setItem("userId", res.data)
                }
            })
        }
    }

    return (
        <React.Fragment>
            <Card>
            <Card.Header style={{ alignSelf: 'center'}}>
                    <h3>Регистрация</h3>
                </Card.Header>
               <Card.Body content='center' style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: 'auto'}}>
                    <div className='pageBody' >

                    <Row md='auto'>
                        <FloatingLabel label='Логин'>
                            <Form.Control required value={user?.username} onChange={(e) => setUser({...user, username: e.target.value})}></Form.Control>
                        </FloatingLabel>
                    </Row>
                    <br />
                    <Row md='auto'>
                        <FloatingLabel label='Пароль'>
                            <Form.Control required type='password' value={user?.password} onChange={(e) => setUser({...user, password: e.target.value})}></Form.Control>
                        </FloatingLabel>
                    </Row>
                    <br />
                    <Row md='auto'>
                        <FloatingLabel label='Имя'>
                            <Form.Control type='text' value={user?.firstname} onChange={(e) => setUser({...user, firstname: e.target.value})}></Form.Control>
                        </FloatingLabel>
                    </Row>
                    <br />
                    <Row md='auto'>
                        <FloatingLabel label='Фамилия'>
                            <Form.Control type='text' value={user?.lastname} onChange={(e) => setUser({...user, lastname: e.target.value})}></Form.Control>
                        </FloatingLabel>
                    </Row>
                    <br />
                    <Row md='auto'>
                        <FloatingLabel label='Отчество'>
                            <Form.Control type='text' value={user?.surname} onChange={(e) => setUser({...user, surname: e.target.value})}></Form.Control>
                        </FloatingLabel>
                    </Row>
                    <br />
                    <Row md='auto'>
                        <FloatingLabel label='Телефон'>
                            <Form.Control type='text' value={user?.phone} onChange={(e) => setUser({...user, phone: e.target.value})}></Form.Control>
                        </FloatingLabel>
                    </Row>
                    <br />
                    <Row >
                        <FloatingLabel label='Дата рождения'>
                            <Form.Control type='date' value={user?.birthday} onChange={(e) => setUser({...user, birthday: e.target.value})}></Form.Control>
                        </FloatingLabel>
                    </Row>
                    <br />
                    <Row>
                        <Col md='auto'>
                            <Button className='defaultBtn' onClick={() => navigate(-1)}>Назад</Button>
                        </Col>
                        <Col md='auto'>
                            <NavLink to={`/Register`}>
                                <Button className='defaultBtn' onClick={() => Register()}>Регистрация </Button>
                            </NavLink>
                        </Col>
                    </Row>
                    </div>

                </Card.Body>
            </Card>
        </React.Fragment>
    )
}