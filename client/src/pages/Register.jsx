import { useState } from "react";
import { useAuth } from '../context/authContext';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {
    const [name, setName ] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSeller, setIsSeller] = useState(false);

    const {register} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const role = isSeller ? 'admin' : 'user';
            await register(name, email, password, role);

            toast.success('Accout Created Successfully!!!');
            navigate('/');
        }catch(error){
            toast.error(error.response?.data?.message || 'Registration Failed');
        }
    };

    return(
        <div className="flex min-h-screen items-center justify-center bg-slate-900 p-4">
      <div className="w-full max-w-md rounded-lg bg-slate-800 p-8 shadow-2xl border border-slate-700">
        
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-white">Create Account</h2>
          <p className="mt-2 text-slate-400">Join our marketplace today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Name Input */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Full Name</label>
            <input
              type="text"
              required
              className="w-full rounded-md border border-slate-600 bg-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Email Address</label>
            <input
              type="email"
              required
              className="w-full rounded-md border border-slate-600 bg-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Password</label>
            <input
              type="password"
              required
              className="w-full rounded-md border border-slate-600 bg-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Seller Checkbox */}
          <div className="flex items-center">
            <input
              id="seller-checkbox"
              type="checkbox"
              className="h-4 w-4 rounded border-slate-600 bg-slate-700 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-800"
              checked={isSeller}
              onChange={(e) => setIsSeller(e.target.checked)}
            />
            <label htmlFor="seller-checkbox" className="ml-2 block text-sm text-slate-300">
              Register as a Seller (Company)
            </label>
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 py-2 font-semibold text-white transition duration-200 hover:bg-indigo-700 active:scale-95"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-400 hover:text-indigo-300 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
    );
};

export default Register;