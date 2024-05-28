import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, FloatingLabel, Form, Row, Table, Toast } from 'react-bootstrap';

import { Pagination, TextField, Skeleton, Alert, AlertTitle } from "@mui/material";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../../constants';

export const AuthPage = () => {

    const [user, setUser] = useState();

    useEffect(() => {
        axios.get(API_URL + 'auth/GetUser', {
            headers: 'Access-Control-Allow-Headers","*"'
        }).then(res => setUser(res.data))
    }, [])

    const login = () => {
        axios.post(API_URL + 'auth/Login', user, {
            headers: 'Access-Control-Allow-Headers","*"'
        }).then(res => {
            if (res.data === null)
                alert("Неверный логин или пароль")
            else
                sessionStorage.setItem("userId", res.data)
        })
    }

    return (
        <React.Fragment>
            <Card>
                <Card.Header style={{ alignSelf: 'center'}}>
                    <h3>Авторизация</h3>
                </Card.Header>
                <Card.Body content='center' style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: 'auto'}}>
                    <div className='pageBody' >
                    <Row md='auto'>
                        <FloatingLabel label='Логин'>
                            <Form.Control value={user?.username} onChange={(e) => setUser({...user, username: e.target.value})}></Form.Control>
                        </FloatingLabel>
                    </Row>
                    <br />
                    <Row md='auto'>
                        <FloatingLabel label='Пароль'>
                            <Form.Control type='password' value={user?.password} onChange={(e) => setUser({...user, password: e.target.value})}></Form.Control>
                        </FloatingLabel>
                    </Row>
                    <br />
                    <Row>
                        <Col md='auto'>
                            <Button className='defaultBtn' onClick={() => login()}>Войти</Button>
                        </Col>
                        <Col md='auto'>
                            <NavLink to={`/Register`}>
                                <Button className='defaultBtn' >Регистрация </Button>
                            </NavLink>
                        </Col>
                    </Row>
                    </div>

                </Card.Body>
            </Card>
        </React.Fragment>
    )
}