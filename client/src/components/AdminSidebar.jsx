import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path 
      ? "bg-indigo-600 text-white" 
      : "text-slate-400 hover:bg-slate-800 hover:text-white";
  };

  return (
    <div className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-700 min-h-screen">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white">Seller Panel</h2>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        <Link 
          to="/dashboard" 
          className={`flex items-center px-4 py-3 rounded-md transition-colors ${isActive('/dashboard')}`}
        >
          Dashboard Overview
        </Link>
        
        <Link 
          to="/dashboard/products" 
          className={`flex items-center px-4 py-3 rounded-md transition-colors ${isActive('/dashboard/products')}`}
        >
          My Products
        </Link>

        <Link 
          to="/dashboard/add-product" 
          className={`flex items-center px-4 py-3 rounded-md transition-colors ${isActive('/dashboard/add-product')}`}
        >
          + Add New Product
        </Link>

        <Link 
          to="/dashboard/orders" 
          className={`flex items-center px-4 py-3 rounded-md transition-colors ${isActive('/dashboard/orders')}`}
        >
          Orders
        </Link>
      </nav>
    </div>
  );
};

export default AdminSidebar;