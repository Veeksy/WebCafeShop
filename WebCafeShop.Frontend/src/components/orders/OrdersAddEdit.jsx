import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, FloatingLabel, Form, Row, Table, Toast } from 'react-bootstrap';
import { Pagination, TextField, Skeleton, Alert, AlertTitle } from "@mui/material";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../../constants';
import swal from "sweetalert";

export const OrdersAddEdit = () => {

    const params = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState();
    const [productList, setProductList] = useState([]);
    const [productListCopyId, setProductListCopyId] = useState([]);

    const [productElement, setProductElement] = useState();
    const [products, setProducts] = useState();

    const [iseffect, setiseffect] = useState(false);
    const toggleisffect = () => setiseffect(!iseffect)

    useEffect(() => {
        axios.get(API_URL + 'orders/GetOrder?idOrder=' + params.idOrder, {
            headers: 'Access-Control-Allow-Headers","*"'
        }).then(res => setOrder(res.data))
    }, [])

    useEffect(() => {
        axios.get(API_URL + 'orders/GetOrderProductList?idOrder=' + params.idOrder, {
            headers: 'Access-Control-Allow-Headers","*"'
        }).then(res => setProductList(res.data))
    }, [])

    useEffect(() => {
        axios.get(API_URL + 'orders/GetOrderProductListElement', {
            headers: 'Access-Control-Allow-Headers","*"'
        }).then(res => setProductElement(res.data))
    }, [iseffect])

    useEffect(() => {
        axios.get(API_URL + 'orders/GetProductForOrder', {
            headers: 'Access-Control-Allow-Headers","*"'
        }).then(res => setProducts(res.data))
    }, [])

    useEffect(() => {
        var list = new Array()
        for (let index = 0; index < productList?.length; index++) {
            list.push(productList[index].idProduct);
        }
        console.log(productList)
        setProductListCopyId(list)
        console.log(list)
    }, [productList])

    const changeProduct = (e, idProduct) => {
        
        var newProduct = productList.filter(x=>x.idProduct == idProduct)[0]

        const newList = productList?.map(o => {
            if (o.idProduct == idProduct){
                newProduct.idProduct = Number(e.target.value)
                return newProduct
            }
            return o;
        })

        setProductList(newList)
    }

    const changeCount = (e, idProduct) => {
        var newProduct = productList.filter(x=>x.idProduct == idProduct)[0]

        const newList = productList?.map(o => {
            if (o.idProduct == idProduct){
                newProduct.count = Number(e.target.value)
                return newProduct
            }
            return o;
        })

        setProductList(newList)
    }

    const changeCost = (e, idProduct) => {
        var newProduct = productList.filter(x=>x.idProduct == idProduct)[0]

        const newList = productList?.map(o => {
            if (o.idProduct == idProduct){
                newProduct.cost = Number(e.target.value)
                return newProduct
            }
            return o;
        })

        setProductList(newList)
    }

    const AddInTable = (e) => {
        if (e.target.value != 0) {
            var pl = [...productList];
            var productName = products?.filter(x=>x.value == e.target.value)[0]?.label
            productElement.productName = productName;
            productElement.idProduct = Number(e.target.value);
            productElement.idOrder = params.idOrder;
            pl.push(productElement);
            setProductList(pl);
            toggleisffect()
        }
    }

    const saveOrder = () => {
        axios.post(API_URL + 'orders/SaveOrder', {
            'order': order,
            'orderList': productList,
        }, {
            headers: 'Access-Control-Allow-Headers","*"'
        }).then(res => alert(res.data)).catch(err => alert(err))
    }

    const DeleteFromTable = (row) => {
        swal({
            title: "Вы действительно хотите удалить?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
        var ta = [...productList]
        ta.splice(row, 1)
       setProductList(ta)
        })
    }

    return (
        <Card>
            <Card.Header>

            </Card.Header>
            <Card.Body>
                <div className='pageBody'>
                    <Row>
                        <Col>
                            <FloatingLabel label='Дата заказа'>
                                <Form.Control type='date' value={order?.dateOrder?.split('T')[0]} onChange={(e) => setOrder({ ...order, dateOrder: e.target.value })}></Form.Control>
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <FloatingLabel label='Дата принятия'>
                                <Form.Control type='date' value={order?.dateAccept?.split('T')[0]} onChange={(e) => setOrder({ ...order, dateAccept: e.target.value })}></Form.Control>
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <div style={{ overflowX: "auto" }}>
                            <Table className="tableObject" bordered hover size="sm" >
                                <thead className="thead-light">
                                    <tr>
                                        <th style={{ whiteSpace: "pre-line" }}>Продукт</th>
                                        <th style={{ whiteSpace: "pre-line" }}>Количество</th>
                                        <th style={{ whiteSpace: "pre-line" }}>Стоимость</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {productList?.map((item, k) => 
                                <tr>
                                        <td>
                                        <Form.Select value={item.idProduct} onChange={(e) => changeProduct(e, item.idProduct)}>
                                                <option>
                                                </option>
                                                {products?.filter(x=> !productListCopyId.includes(x.value) || x.value == item.idProduct)?.map((_item) =>
                                                    <option value={_item.value}>
                                                        {_item.label}
                                                    </option>
                                                )}
                                            </Form.Select>
                                            
                                        </td>
                                        <td><Form.Control value={item?.count} onChange={(e) => changeCount(e, item.idProduct)}></Form.Control> </td>
                                        <td><Form.Control value={item?.cost} onChange={(e) => changeCost(e, item.idProduct)}></Form.Control> </td>
                                        <td><Button className='defaultBtn' onClick={() => DeleteFromTable(k)}>Удалить</Button></td>
                                    </tr>
                                    )}
                                    <tr>
                                        <td>
                                            <Form.Select value={productElement?.idProduct} onChange={(e) => AddInTable(e)}>
                                                <option value={0}>
                                                    Не указано
                                                </option>
                                                {products?.filter(x => !productListCopyId?.includes(x.value))?.map((item) =>
                                                    <option value={item.value}>
                                                        {item.label}
                                                    </option>
                                                )}
                                            </Form.Select>
                                        </td>
                                        <td>
                                            <Form.Control type='number' value={productElement?.count} onChange={(e) => setProductElement({...productElement, count: e.target.value})}></Form.Control>
                                        </td>
                                        <td>
                                            <Form.Control type='number' value={productElement?.cost} onChange={(e) => setProductElement({...productElement, cost: e.target.value})}></Form.Control>
                                        </td>
                                    </tr>
                                    
                                </tbody>
                            </Table>
                        </div>
                    </Row>
                    <br />
                    <Row>
                        <Col md='auto'>
                        <Button className='defaultBtn' onClick={() => navigate(-1)}>Назад</Button>
                        </Col>
                        <Col md='auto'>
                        <Button className='specialBtn' onClick={() => saveOrder()}>Сохранить</Button>
                        </Col>

                    </Row>
                </div>
            </Card.Body>
        </Card>
    )

}