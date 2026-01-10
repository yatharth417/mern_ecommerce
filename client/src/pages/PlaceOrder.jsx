import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // <--- Ensure Axios is imported
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';

const PlaceOrder = () => {
  const { cartItems, shippingAddress, clearCart } = useCart();
  const navigate = useNavigate();

  // 1. Calculate Prices (Simple version: Total = Items Price)
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const itemsPrice = Number(cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
  const shippingPrice = 0;
  const taxPrice = 0;
  const totalPrice = itemsPrice;

  // 2. Redirect if missing data
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    } else if (!shippingAddress.address) {
      navigate('/checkout');
    }
  }, [cartItems, shippingAddress, navigate]);

  // 3. THE REAL BACKEND CONNECTION
  const placeOrderHandler = async () => {
    try {
      const orderData = {
        // Map cart items to backend schema (backend expects 'product' field, not '_id')
        orderItems: cartItems.map((item) => ({
          product: item._id,
          name: item.name,
          qty: item.qty,
          image: item.image,
          price: item.price,
        })),
        shippingAddress,
        paymentMethod: 'Cash on Delivery',
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      };

      // Send to Backend
      // 'withCredentials' is required so the server knows who you are!
      const { data } = await axios.post('http://localhost:5000/api/orders', orderData, {
        withCredentials: true,
      });

      toast.success('Order Placed Successfully!');
      clearCart(); // Empty the cart
      navigate('/myorders'); // Redirect to "My Orders" page to see the proof
      
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Order failed');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="mb-8 text-3xl font-bold text-white">Review Order</h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          {/* LEFT COLUMN: Details */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Shipping Info */}
            <div className="rounded-lg bg-slate-800 p-6 border border-slate-700">
              <h2 className="mb-4 text-xl font-bold text-white border-b border-slate-700 pb-2">Shipping</h2>
              <p className="text-slate-300">
                <strong className="text-indigo-400">Address: </strong>
                {shippingAddress.address}, {shippingAddress.city},{' '}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
            </div>

            {/* Payment Method */}
            <div className="rounded-lg bg-slate-800 p-6 border border-slate-700">
              <h2 className="mb-4 text-xl font-bold text-white border-b border-slate-700 pb-2">Payment Method</h2>
              <p className="text-slate-300">
                <strong className="text-indigo-400">Method: </strong>
                Cash on Delivery (Standard)
              </p>
            </div>

            {/* Order Items */}
            <div className="rounded-lg bg-slate-800 p-6 border border-slate-700">
              <h2 className="mb-4 text-xl font-bold text-white border-b border-slate-700 pb-2">Order Items</h2>
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between border-b border-slate-700 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="h-16 w-16 rounded object-cover bg-slate-700" />
                      <Link to={`/product/${item._id}`} className="text-indigo-400 hover:underline">
                        {item.name}
                      </Link>
                    </div>
                    <div className="text-slate-300 text-sm">
                      {item.qty} x Rs. {item.price} = <span className="font-bold text-white">Rs. {(item.qty * item.price).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-lg bg-slate-800 p-6 border border-slate-700 sticky top-24 shadow-xl">
              <h2 className="mb-6 text-2xl font-bold text-white text-center">Order Summary</h2>
              
              <div className="space-y-3 text-slate-300">
                <div className="flex justify-between">
                  <span>Items</span>
                  <span>Rs. {itemsPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Rs. 0.00</span>
                </div>
                
                <div className="border-t border-slate-600 my-2"></div>
                
                <div className="flex justify-between text-xl font-bold text-white">
                  <span>Total</span>
                  <span>Rs. {totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={placeOrderHandler}
                className="w-full mt-6 rounded-lg bg-emerald-600 py-3 font-bold text-white hover:bg-emerald-700 transition shadow-lg active:scale-95"
              >
                Place Order
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;