import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Configure Axios globally
  axios.defaults.withCredentials = true;

  // 1. LOGIN Function
  const login = async (email, password) => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      return data; // Return data so the component can handle success
    } catch (error) {
      throw error; // Throw error so the component can handle failure
    }
  };

  // 2. REGISTER Function (This was missing!)
  const register = async (name, email, password, role) => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
        role,
      });
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      return data;
    } catch (error) {
      throw error;
    }
  };

  // 3. LOGOUT Function
  const logout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout');
      setUser(null);
      localStorage.removeItem('user');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // Check if user is logged in on load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  return (
    // Now 'register' is defined above, so this line won't crash
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);