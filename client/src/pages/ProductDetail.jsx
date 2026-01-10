import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        toast.error('Product not found');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, 1);
    toast.success('Added to Cart');
  };

  if (loading) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Loading...</div>;
  if (!product) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Product not found</div>;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-10">
        <Link to="/" className="text-slate-400 hover:text-white mb-6 inline-block">
          &larr; Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* LEFT: Image */}
          <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700 p-2">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-96 object-contain"
            />
          </div>

          {/* RIGHT: Info */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">{product.name}</h1>
            <p className="text-slate-400 text-lg">Brand: <span className="text-indigo-400">{product.brand}</span></p>
            
            <div className="border-t border-b border-slate-700 py-4">
              <p className="text-4xl font-bold text-white">Rs. {product.price}</p>
            </div>

            <p className="text-slate-300 leading-relaxed">
              {product.description}
            </p>

            {/* Stock Status Box */}
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
              <div className="flex justify-between mb-4">
                <span className="font-medium text-slate-300">Status:</span>
                <span className={product.countInStock > 0 ? "text-green-400 font-bold" : "text-red-500 font-bold"}>
                  {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              <button
                onClick={handleAddToCart} 
                disabled={product.countInStock === 0}
                className={`w-full py-3 rounded-lg font-bold text-white transition 
                  ${product.countInStock > 0 
                    ? "bg-indigo-600 hover:bg-indigo-700" 
                    : "bg-slate-600 cursor-not-allowed"}`}
              >
                {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;