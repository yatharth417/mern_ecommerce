import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast'; // <--- Import Toast

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Orders Function (Moved outside useEffect so we can reuse it)
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/orders', {
        withCredentials: true,
      });
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 2. Handler to Mark Delivered
  const deliverHandler = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/${id}/deliver`,
        {}, // Empty body
        { withCredentials: true } // Admin Cookie
      );
      toast.success('Order Marked as Delivered');
      fetchOrders(); // Refresh the list automatically
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating order');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Navbar />
      
      <div className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="mb-8 text-3xl font-bold text-white">Seller Dashboard (All Orders)</h1>

        {loading ? (
          <p>Loading orders...</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-slate-700 bg-slate-800">
            <table className="min-w-full text-left text-sm text-slate-400">
              <thead className="bg-slate-900 text-xs uppercase text-slate-200">
                <tr>
                  <th className="px-6 py-3">Order ID</th>
                  <th className="px-6 py-3">User</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Total</th>
                  <th className="px-6 py-3">Delivered</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-slate-700 transition">
                    <td className="px-6 py-4">{order._id}</td>
                    <td className="px-6 py-4 font-bold text-white">
                      {order.user ? order.user.name : 'Deleted User'}
                    </td>
                    <td className="px-6 py-4">{order.createdAt ? order.createdAt.substring(0, 10) : '—'}</td>
                    <td className="px-6 py-4 text-emerald-400 font-bold">Rs. {order.totalPrice}</td>
                    
                    <td className="px-6 py-4">
                      {order.isDelivered ? (
                        <span className="text-emerald-400 font-bold">
                          {order.deliveredAt ? order.deliveredAt.substring(0, 10) : 'Delivered'}
                        </span>
                      ) : (
                        <span className="text-red-400">Pending</span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      {/* Only show button if NOT delivered yet */}
                      {!order.isDelivered && (
                        <button 
                          onClick={() => deliverHandler(order._id)}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-xs font-bold transition"
                        >
                          Mark Delivered
                        </button>
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

export default OrderList;