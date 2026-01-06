import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { CartProvider, useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const Navbar = () => {
    const {user , logout} = useAuth();
    const {cartItems} = useCart();
    const navigate =useNavigate();

    const handleLogout = async () => {
        await logout();
        toast.success('Successfully Logged out');
        navigate('/login');
    };

    return(
        <nav className='"sticky top-0 z-50 w-full border-b border-slate-700 bg-slate-900/95 backdrop-blur shadow-md"'>
            <div className='"mx-auto flex max-w-7xl items-center justify-between px-4 py-3"'>

                {/*LOGO*/}
                <Link to="/" className='"text-2xl font-bold text-white tracking-wide hover:text-indigo-400 transition"'>
                MERN <span className="text-indigo-500">Shop</span>
                </Link>

                {/*Search bar*/ }
                <div className="hidden md:flex flex-1 mx-10 max-w-md">
                    <input 
                        type="text" 
                        placeholder="Search products..." 
                        className="w-full rounded-md border border-slate-600 bg-slate-800 px-4 py-2 text-sm text-white placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                </div>

                {/*Right side links*/}
                <div className='flex items center space-x-6'>
                    {user ?(
                        // if logged in
                        <>
                            {/* show seller dashboard if user is company/admin */}
                            {user.role === 'admin'  && (
                                <Link to="/dashboard" className="text-sm font-medium text-emerald-400 hover:text-emerald-300">
                                    Seller Dashboard
                                </Link>
                            )}
                            <span className='text-slate-300 text-sm'>Hi, {user.name}</span>

                            <button
                            onClick={handleLogout}
                            className='rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition'>
                                Logout
                            </button>
                        </>
                    ):(
                        // if not logged in (guest)
                        <div className="space-x-4">
                            <Link to="/login" className="text-slate-300 hover:text-white transition">
                                Login
                            </Link>
                            <Link to="/register" className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition">
                                Register
                            </Link>
                        </div>
                    )}
                    {/* CART ICON */}
                        <Link to="/cart" className="relative text-slate-300 hover:text-white transition mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                        
                        {/* Badge Counter */}
                        {cartItems.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                            {cartItems.length}
                            </span>
                        )}
                        </Link>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;