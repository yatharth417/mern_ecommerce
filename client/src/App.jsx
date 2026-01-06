import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import AddProduct from './pages/AddProduct';
import ProductDetails from './pages/ProductDetail';

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

      </Routes>
    </div>
  );
}

export default App;