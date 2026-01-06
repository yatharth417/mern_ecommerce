import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: '',
    description: '',
    price: '',
    countInStock: '',
    image: 'https://via.placeholder.com/300', // Placeholder for now
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/products',
        formData,
        { withCredentials: true }
    );
      toast.success('Product Added Successfully!');
      navigate('/dashboard/products'); // Redirect to product list (we will build this next)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error adding product');
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">Add New Product</h1>

        <div className="max-w-2xl bg-slate-800 rounded-lg p-8 border border-slate-700 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Grid for Name & Brand */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Product Name</label>
                <input
                  type="text" name="name" required
                  className="w-full bg-slate-700 border border-slate-600 rounded p-2 focus:ring-indigo-500 focus:border-indigo-500"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Brand</label>
                <input
                  type="text" name="brand" required
                  className="w-full bg-slate-700 border border-slate-600 rounded p-2 focus:ring-indigo-500 focus:border-indigo-500"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Grid for Price & Stock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Price ($)</label>
                <input
                  type="number" name="price" required min="0"
                  className="w-full bg-slate-700 border border-slate-600 rounded p-2 focus:ring-indigo-500 focus:border-indigo-500"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Stock Quantity</label>
                <input
                  type="number" name="countInStock" required min="0"
                  className="w-full bg-slate-700 border border-slate-600 rounded p-2 focus:ring-indigo-500 focus:border-indigo-500"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Category</label>
              <input
                type="text" name="category" required
                className="w-full bg-slate-700 border border-slate-600 rounded p-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Electronics, Clothing, etc."
                onChange={handleChange}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Description</label>
              <textarea
                name="description" required rows="4"
                className="w-full bg-slate-700 border border-slate-600 rounded p-2 focus:ring-indigo-500 focus:border-indigo-500"
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Image URL (Temporary) */}
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Image URL</label>
              <input
                type="text" name="image"
                className="w-full bg-slate-700 border border-slate-600 rounded p-2 focus:ring-indigo-500 focus:border-indigo-500"
                defaultValue={formData.image}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded transition-colors"
            >
              Create Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;