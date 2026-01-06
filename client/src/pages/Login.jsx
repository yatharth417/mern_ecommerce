import { useState } from 'react';
import { useAuth } from '../context/authContext';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Login Successful!');
      navigate('/'); // Redirect to home after login
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    // FULL PAGE CONTAINER: Dark background, centers content vertically & horizontally
    <div className="flex min-h-screen items-center justify-center bg-slate-900 p-4">
      
      {/* CARD: Lighter dark shade (slate-800), rounded corners, shadow */}
      <div className="w-full max-w-md rounded-lg bg-slate-800 p-8 shadow-2xl border border-slate-700">
        
        {/* HEADER */}
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
          <p className="mt-2 text-slate-400">Sign in to your account</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email Input */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Email Address
            </label>
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
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full rounded-md border border-slate-600 bg-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 py-2 font-semibold text-white transition duration-200 hover:bg-indigo-700 active:scale-95"
          >
            Sign In
          </button>
        </form>

        {/* Footer Link */}
        <p className="mt-6 text-center text-sm text-slate-400">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-indigo-400 hover:text-indigo-300 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;