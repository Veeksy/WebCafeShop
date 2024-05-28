import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { RoutesPath } from './routes';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../constants';

export default (_props = {}) => {

    const [userId, setUserId] = useState();
    const [user, setUser] = useState();

    useEffect(() => {
      setUserId(sessionStorage.getItem("userId"))
    }, [])

    useEffect(() => {
      axios.get(API_URL + 'auth/GetUserInfo?id=' + sessionStorage.getItem("userId"), {
          headers: 'Access-Control-Allow-Headers","*"'
      }).then(res => setUser(res.data))
  }, [])


    return (
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand>Система учета заказов</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href={RoutesPath.Orders.path}>Заказы</Nav.Link>
                <Nav.Link href={RoutesPath.Products.path}>Продукты</Nav.Link>
                <NavDropdown title="Работники" id="basic-nav-dropdown">
                  <NavDropdown.Item >
                    Администраторы
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4">
                    Менеджеры
                  </NavDropdown.Item>
                </NavDropdown>
                
              </Nav>
            </Navbar.Collapse>
          {userId ? (<Nav.Link  href={RoutesPath.userPage.path}>{user?.username}</Nav.Link>) : (<Nav.Link href={RoutesPath.Login.path}>Войти</Nav.Link>)}

          </Container>

        </Navbar>
      );
}