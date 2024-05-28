import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, FloatingLabel, Form, Row, Table, Toast } from 'react-bootstrap';

import { Pagination, TextField, Skeleton, Alert, AlertTitle } from "@mui/material";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../../constants';

export const EditUserPage = () => {

    const [user, setUser] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(API_URL + 'auth/GetUserInfo?id=' + sessionStorage.getItem("userId"), {
            headers: 'Access-Control-Allow-Headers","*"'
        }).then(res => setUser(res.data))
        .catch(() => navigate('/login'))
    }, [])


   const saveUser = () => {
    axios.post(API_URL + 'auth/SaveUserData', user, {
        headers: 'Access-Control-Allow-Headers","*"'
    }).then(res => alert(res.data)).catch(err => alert(err.data))
    navigate(-1)
   }

    return (
        <React.Fragment>
            <Card>
            <Card.Header style={{ alignSelf: 'center'}}>
                    <h3>Редактирование пользователя</h3>
                </Card.Header>
               <Card.Body content='center' style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: 'auto'}}>
                    <div className='pageBody' >

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
                    <Row >
                        <FloatingLabel label='Роль'>
                            <Form.Select value={user?.role} onChange={(e) => setUser({...user, role: e.target.value})}>
                            <option value={null}>
                                    Не указано
                                </option>
                                <option value={'Администратор'}>
                                    Администратор
                                </option>
                                <option value={'Менеджер'}>
                                    Менеджер
                                </option>
                            </Form.Select>
                        </FloatingLabel>
                    </Row>
                    <br />
                    <Row>
                        <Col md='auto'>
                            <Button className='defaultBtn' onClick={() => navigate(-1)}>Назад</Button>
                        </Col>
                        <Col md='auto'>
                            <NavLink to={`/Register`}>
                                <Button className='defaultBtn' onClick={() => saveUser()}>Сохранить</Button>
                            </NavLink>
                        </Col>
                    </Row>
                    </div>

                </Card.Body>
            </Card>
        </React.Fragment>
    )
}