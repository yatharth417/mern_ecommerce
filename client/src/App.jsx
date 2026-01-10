import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import AddProduct from './pages/AddProduct';
import ProductDetails from './pages/ProductDetail';
import Cart from './pages/Cart';
import Shipping from './pages/Shipping';
import PlaceOrder from './pages/PlaceOrder';
import MyOrders from './pages/MyOrders';
import OrderList from './pages/OrdersList';

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Routes>
        {/* For now, redirect Home to Login so you can see your work immediately */}
        <Route path="/" element={<Home/>} />

        <Route path="/product/:id" element={<ProductDetails/>}/>
        
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        
        {/* Placeholder for Register (we will build this next) */}
        <Route path="/register" element={<Register/>} />

        <Route path='/dashboard/add-product' element={<AddProduct/>} />

        <Route path='/cart' element={<Cart/>}/>

        <Route path='/checkout' element={<Shipping/>}/>

        <Route path='/place-order' element={<PlaceOrder/>} />

        <Route path='/myorders' element={<MyOrders/>}/>

        <Route path ='/admin/orderlist' element={<OrderList/>}/>

      </Routes>
    </div>
  );
}

export default App;