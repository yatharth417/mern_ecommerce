import { Link, useLocation } from 'react-router-dom';

const SellerSidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "bg-indigo-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white";
  };

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 min-h-screen p-6 hidden md:block">
      <h2 className="text-2xl font-bold text-white mb-10">Seller Panel</h2>
      
      <nav className="space-y-4">
        {/* 1. My Products Link */}
        <Link 
          to="/dashboard/my-products" 
          className={`block px-4 py-3 rounded-lg transition font-medium ${isActive('/dashboard/my-products')}`}
        >
          My Products
        </Link>

        {/* 2. Add New Product Link */}
        <Link 
          to="/dashboard/add-product" 
          className={`block px-4 py-3 rounded-lg transition font-medium ${isActive('/dashboard/add-product')}`}
        >
          + Add New Product
        </Link>

        {/* 3. Orders Link (Redirects to your existing Order List) */}
        <Link 
          to="/admin/orderlist" 
          className={`block px-4 py-3 rounded-lg transition font-medium ${isActive('/admin/orderlist')}`}
        >
          Orders
        </Link>
      </nav>
    </div>
  );
};

export default SellerSidebar;