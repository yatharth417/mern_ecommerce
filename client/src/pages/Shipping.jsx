import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useCart } from "../context/CartContext";
import Navbar from '../components/Navbar';

const Shipping = () => {
    const { shippingAddress, saveShippingAddress } = useCart();
    const navigate = useNavigate();

    const [ address, setAddress] = useState(shippingAddress.address || '');
    const [ city, setCity ] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');

    const submitHandler = (e) => {
        e.preventDefault();
        saveShippingAddress({ address, city, postalCode, country});

        navigate('/place-order');
    };
    return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Navbar />
      
      <div className="flex justify-center items-center mt-10 px-4">
        <div className="w-full max-w-md bg-slate-800 p-8 rounded-lg border border-slate-700 shadow-lg">
          
          {/* Progress Bar (Visual Only) */}
          <div className="mb-6 flex justify-between text-sm text-slate-400">
            <span className="text-indigo-400 font-bold">1. Shipping</span>
            <span>2. Confirmation</span>
            <span>3. Payment</span>
          </div>

          <h1 className="text-2xl font-bold mb-6 text-white">Shipping Address</h1>

          <form onSubmit={submitHandler} className="space-y-4">
            
            {/* Address */}
            <div>
              <label className="block text-slate-400 mb-1">Address</label>
              <input
                type="text" required
                value={address} onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="123 Main St"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-slate-400 mb-1">City</label>
              <input
                type="text" required
                value={city} onChange={(e) => setCity(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="New York"
              />
            </div>

            {/* Postal Code */}
            <div>
              <label className="block text-slate-400 mb-1">Postal Code</label>
              <input
                type="text" required
                value={postalCode} onChange={(e) => setPostalCode(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="10001"
              />
            </div>

            {/* Country */}
            <div>
              <label className="block text-slate-400 mb-1">Country</label>
              <input
                type="text" required
                value={country} onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="USA"
              />
            </div>

            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded mt-4 transition">
              Continue to Confirmation
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Shipping;