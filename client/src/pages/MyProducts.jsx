import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import SellerSidebar from '../components/SellerSidebar';

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products/myproducts', {
          withCredentials: true,
        });
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchMyProducts();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />
      
      <div className="flex flex-1">
        {/* SIDEBAR */}
        <SellerSidebar />

        {/* MAIN CONTENT */}
        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-white mb-8">My Products</h1>

          {loading ? (
            <p>Loading...</p>
          ) : products.length === 0 ? (
            <p className="text-slate-400">No products found. Add one!</p>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-900">
              <table className="min-w-full text-left text-sm text-slate-400">
                <thead className="bg-slate-800 text-xs uppercase text-slate-200">
                  <tr>
                    <th className="px-6 py-3">Image</th>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Price</th>
                    <th className="px-6 py-3">Category</th>
                    <th className="px-6 py-3">Brand</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {products.map((product) => (
                    <tr key={product._id} className="hover:bg-slate-800 transition">
                      <td className="px-6 py-4">
                        <img src={product.image} alt={product.name} className="h-12 w-12 object-cover rounded bg-slate-700" />
                      </td>
                      <td className="px-6 py-4 font-medium text-white">{product.name}</td>
                      <td className="px-6 py-4 text-emerald-400 font-bold">${product.price}</td>
                      <td className="px-6 py-4">{product.category}</td>
                      <td className="px-6 py-4">{product.brand}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProducts;