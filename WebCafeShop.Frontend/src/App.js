import logo from './logo.svg';
import './App.css';
import './App.scss';
import Sidebar from './content/sidebar';
import { Route, BrowserRouter as Router, Routes, useNavigate } from "react-router-dom";
import { Dashboard } from './components/Dashboard';
import { RoutesPath } from './content/routes';
import { OrdersPage } from './components/orders/Orders';
import { ProductsPage } from './components/products';
import { ProductAddEdit } from './components/productAddEdit';
import { ToastContainer } from 'react-toastify';
import { AuthPage } from './components/auth/auth';
import { RegisterPage } from './components/auth/register';
import useToken from './Identity/useToken';
import { EditUserPage } from './components/auth/userInfo';
import { OrdersAddEdit } from './components/orders/OrdersAddEdit';

function App() {

  const { Token, setToken } = useToken();
  // axios.get(API_URL + "Home/Checkauthorized",
  // {
  //     headers: {
  //         'Authorization': 'Bearer ' + Token
  //     },
  //     validateStatus: function (status) {
  //         if (status == 401) {
  //             setStatus(false);
  //             sessionStorage.clear();
  //         }

  //     }
  // })
  // .catch(function (err){
  //     if(err.code==='ERR_NETWORK'){
  //         errconnect();
  //     } else {
  //        // AxiosCatch_Get(err);
  //     }
  // })
  return (
    <Router>
      <div className='content'>
        <Sidebar />
      </div>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/login' element={<AuthPage />} />
        <Route path='/EditUser' element={<EditUserPage />} />
        <Route path='/Register' element={<RegisterPage />} />
        <Route path='/orders' element={<OrdersPage />} />
        <Route path='/addEditOrders/$idOrder/:idOrder' element={<OrdersAddEdit />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/addEditProducts/$idProduct/:idProduct' element={<ProductAddEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
