import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('http://localhost:5000/api/products');
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Latest Products</h1>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <Link key={product._id} to={`/product/${product._id}`} className="group block overflow-hidden rounded-lg bg-slate-800 border border-slate-700 shadow-lg transition hover:shadow-2xl">
              
              {/* Image */}
              <div className="h-64 w-full overflow-hidden bg-slate-700">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 truncate">
                  {product.name}
                </h3>
                
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-slate-400 text-sm">{product.brand}</p>
                  <p className="text-lg font-bold text-indigo-400">${product.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;