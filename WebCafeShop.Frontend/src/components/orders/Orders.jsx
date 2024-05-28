import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, FloatingLabel, Row, Table } from 'react-bootstrap';
import { API_URL } from '../../constants';
import { Pagination, TextField, Skeleton } from "@mui/material";
import { NavLink } from 'react-router-dom';

export const OrdersPage = () => {

    const [orders, setOrders] = useState([]);
    const [loader, setLoader] = useState(true);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);

    useEffect(() => {
        axios.get(API_URL + 'orders/GetOrders?page=' + page, {
            headers: 'Access-Control-Allow-Headers","*"'
        }).then((res) => {
            setOrders(res.data.data);
            setLoader(false)
            setPages(Math.ceil(res.data.count / 10))
        })
        console.log(Math.ceil(1 / 10))
    }, [page])


    const handlePageChange = (event, value) => {
        setLoader(true)
        setPage(value);
    };

    return (
        <React.Fragment>
            <Card>
                <Card.Header>
                    <Col md='auto'>
                        <h3>Заказы</h3>
                    </Col>
                    <Col md='auto'>
                        <NavLink to={`/addEditOrders/$idOrder/${0}`}>
                            <Button className='defaultBtn'>Добавить</Button>
                        </NavLink>
                    </Col>
                </Card.Header>
                <Card.Body>
                    <div className="pageBody">
                        <div style={{ overflowX: "auto" }}>
                            <Table className="tableObject" bordered hover size="sm" >
                                <thead className="thead-light">
                                    <tr>
                                        <th style={{ whiteSpace: "pre-line" }}>Номер заказа</th>
                                        <th style={{ whiteSpace: "pre-line" }}>Дата заказа</th>
                                        <th style={{ whiteSpace: "pre-line" }}>Дата принятия</th>
                                        <th style={{ whiteSpace: "pre-line" }}>Пользователь</th>
                                    </tr>
                                </thead>
                                {loader ? (
                                    <>
                                        <tr>
                                            <td><Skeleton animation="wave" height={30} width="100%" /></td>
                                            <td><Skeleton animation="wave" height={30} width="100%" /></td>
                                            <td><Skeleton animation="wave" height={30} width="100%" /></td>
                                            <td><Skeleton animation="wave" height={30} width="100%" /></td>
                                            <td><Skeleton animation="wave" height={30} width="100%" /></td>
                                            <td><Skeleton animation="wave" height={30} width="100%" /></td>
                                        </tr>
                                        <tr>
                                            <td><Skeleton animation="wave" height={30} width="100%" /></td>
                                            <td><Skeleton animation="wave" height={30} width="100%" /></td>
                                            <td><Skeleton animation="wave" height={30} width="100%" /></td>
                                            <td><Skeleton animation="wave" height={30} width="100%" /></td>
                                            <td><Skeleton animation="wave" height={30} width="100%" /></td>
                                            <td><Skeleton animation="wave" height={30} width="100%" /></td>
                                        </tr>
                                        <p>загрузка данных, подождите....</p>
                                    </>

                                ) : (
                                    <tbody>
                                        {orders?.map((item) =>
                                            <tr>
                                                <td>
                                                    <NavLink to={`/addEditOrders/$idOrder/${item.id}`}>
                                                        {item.id}
                                                    </NavLink>
                                                </td>
                                                <td>{item.dateOrder ? new Date(item.dateOrder)?.toLocaleDateString() : ''}</td>
                                                <td>{item.dateAccept ? new Date(item.dateAccept)?.toLocaleDateString() : ''}</td>
                                                <td>{item.user}</td>
                                            </tr>
                                        )}
                                    </tbody>)}
                            </Table>
                        </div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <Pagination count={pages} page={page}
                            onChange={handlePageChange} variant="standart" />
                    </div>
                </Card.Body>
            </Card>
        </React.Fragment>
    )
}