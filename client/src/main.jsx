import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // <--- Import this
import { Toaster } from 'react-hot-toast';        // <--- Import for notifications
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/authContext.jsx';
import { CartProvider } from './context/CartContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* <--- Wrap everything in Router */}
      <AuthProvider>
        <CartProvider>
        <App />
        <Toaster position="top-center" /> {/* <--- Popup notifications */}
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);