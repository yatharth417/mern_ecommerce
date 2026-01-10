import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/authContext';
import Navbar from '../components/Navbar';

const Cart = () => {
    const { cartItems, removeFromCart, addToCart } = useCart();
    const {user} = useAuth();
    const navigate = useNavigate();

    const total = cartItems.reduce((acc, item) => acc+ item.qty * item.price, 0).toFixed(2);

    const checkoutHandler = () => {
        if(user){
            navigate('/checkout');
        }else{
            navigate('/login?redirect=checkout');
        }
    };
    return (
        <div className="min-h-screen bg-slate-900 text-slate-100">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="rounded-lg bg-slate-800 p-8 text-center border border-slate-700">
            <h2 className="text-xl text-slate-300">Your cart is empty</h2>
            <Link to="/" className="mt-4 inline-block text-indigo-400 hover:text-indigo-300">
              Go back to shopping &rarr;
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            
            {/* LEFT: Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center gap-4 rounded-lg bg-slate-800 p-4 border border-slate-700">
                  
                  {/* Image */}
                  <img src={item.image} alt={item.name} className="h-24 w-24 rounded object-cover bg-slate-700" />
                  
                  {/* Details */}
                  <div className="flex-1">
                    <Link to={`/product/${item._id}`} className="text-lg font-medium text-white hover:text-indigo-400">
                      {item.name}
                    </Link>
                    <p className="text-slate-400">{item.brand}</p>
                    <p className="font-bold text-indigo-400">Rs. {item.price}</p>
                  </div>

                  {/* Quantity Selector */}
                  <select
                    className="rounded border border-slate-600 bg-slate-700 py-1 px-2 text-white focus:outline-none"
                    value={item.qty}
                    onChange={(e) => addToCart(item, Number(e.target.value) - item.qty)} 
                    // Note: Our addToCart adds to existing, so we pass the difference or just fix logic later. 
                    // For simplicity, let's just re-add the item with the specific qty in context if needed, 
                    // but usually addToCart adds UP. 
                    // Let's use a simpler approach: Just run addToCart 1 by 1 or implement 'updateCart' later.
                    // For now, let's just show the qty number:
                    disabled
                  >
                     <option>{item.qty}</option>
                  </select>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="rounded p-2 text-red-400 hover:bg-slate-700 hover:text-red-300 transition"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* RIGHT: Order Summary */}
            <div className="lg:col-span-1">
              <div className="rounded-lg bg-slate-800 p-6 border border-slate-700 sticky top-24">
                <h2 className="mb-4 text-xl font-bold text-white">Order Summary</h2>
                
                <div className="mb-2 flex justify-between text-slate-300">
                  <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                  <span>Rs. {total}</span>
                </div>
                
                <div className="my-4 border-t border-slate-700"></div>
                
                <div className="mb-6 flex justify-between text-xl font-bold text-white">
                  <span>Total</span>
                  <span>Rs. {total}</span>
                </div>

                <button
                  onClick={checkoutHandler}
                  className="w-full rounded-lg bg-indigo-600 py-3 font-bold text-white hover:bg-indigo-700 transition"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;