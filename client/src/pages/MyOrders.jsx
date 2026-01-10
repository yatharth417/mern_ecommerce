import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const MyOrders =() => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try{
                // withCredentials is required to send the cookie (Auth)
                const { data } = await axios.get('http://localhost:5000/api/orders/myorders', {
                withCredentials: true,
            });
            setOrders(data);
            setLoading(false);
        } catch(error){
            console.error(error);
            setLoading(false);
        }
    };

     fetchOrders();
    }, []);

    return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Navbar />
      
      <div className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="mb-8 text-3xl font-bold">My Orders</h1>

        {loading ? (
          <p>Loading...</p>
        ) : orders.length === 0 ? (
          <div className="rounded-lg bg-slate-800 p-8 text-center border border-slate-700">
            <h2 className="text-xl text-slate-300">You haven't placed any orders yet.</h2>
            <Link to="/" className="mt-4 inline-block text-indigo-400 hover:text-indigo-300">
              Start Shopping &rarr;
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-slate-700">
            <table className="min-w-full text-left text-sm text-slate-400">
              <thead className="bg-slate-800 text-xs uppercase text-slate-200">
                <tr>
                  <th className="px-6 py-3">Order ID</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Total</th>
                  <th className="px-6 py-3">Paid</th>
                  <th className="px-6 py-3">Delivered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700 bg-slate-900">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-slate-800 transition">
                    <td className="px-6 py-4 font-medium text-white">{order._id}</td>
                    <td className="px-6 py-4">{order.createdAt ? order.createdAt.substring(0, 10) : '—'}</td>
                    <td className="px-6 py-4 text-emerald-400 font-bold">Rs. {order.totalPrice}</td>
                    <td className="px-6 py-4">
                      {order.isPaid ? (
                        <span className="text-emerald-400">Paid</span>
                      ) : (
                        <span className="text-red-400">Not Paid</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {order.isDelivered ? (
                        <span className="text-emerald-400">Delivered</span>
                      ) : (
                        <span className="text-red-400">Processing</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;