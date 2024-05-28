import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, FloatingLabel, Row, Table } from 'react-bootstrap';
import {API_URL} from '../constants'
import { Pagination, TextField, Skeleton } from "@mui/material";
import { NavLink, useRoutes } from 'react-router-dom';

export const ProductsPage = () => {

    const [orderList, setOrderList] = useState([]);
    const [loader, setLoader] = useState(true);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);

    useEffect(() => { 
        axios.get(API_URL + 'product/GetProductList?page=' + page, {
            headers: 'Access-Control-Allow-Headers","*"'
        }).then(res => {
            setOrderList(res.data.data)
            setLoader(false)
            setPages(Math.ceil(res.data.count / 10))
        })
    }, [page])

    const handlePageChange = (event, value) => {
        setLoader(true)
        setPage(value);
    };

    return (
        <React.Fragment>
            <Card>
                <Card.Header>
                    <h3>Продукты</h3>
                    <NavLink to={`/addEditProducts/$idProduct/${0}`}>
                    <Button className='defaultBtn'>
                        Добавить
                    </Button>
                    </NavLink>
                </Card.Header>
                    <Card.Body>
                    <div className="pageBody">
                    <div style={{ overflowX: "auto" }}>
                                    <Table className="tableObject" bordered hover size="sm" >
                                        <thead className="thead-light">
                                            <tr>
                                                <th style={{ whiteSpace: "pre-line" }}></th>
                                                <th style={{ whiteSpace: "pre-line" }}>Наименование</th>
                                                <th style={{ whiteSpace: "pre-line" }}>Срок годности</th>
                                                <th style={{ whiteSpace: "pre-line" }}>Вес</th>
                                                <th style={{ whiteSpace: "pre-line" }}>Количество</th>
                                                <th style={{ whiteSpace: "pre-line" }}>Страна</th>
                                                <th style={{ whiteSpace: "pre-line" }}>Описание</th>
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
                                            {orderList?.map((items) => 
                                                <tr style={{height: '70px'}}>
                                                    <td></td>
                                                        <NavLink to={`/addEditProducts/$idProduct/${items.id}`}>
                                                            <td>{items.name}</td>
                                                        </NavLink>
                                                    <td>{items.expirationDate}</td>
                                                    <td>{items.weight}</td>
                                                    <td>{items.count}</td>
                                                    <td></td>
                                                    <td>{items.description}</td>
                                                </tr>
                                                )}
                                        </tbody>)}
                                    </Table>
                                </div>
                                <div style={{ textAlign: "center" }}>
                                <Pagination count={pages} page={page}
                                    onChange={handlePageChange} variant="standart" />
                            </div>
                        </div>
                    </Card.Body>
            </Card>
        </React.Fragment>
    )
}