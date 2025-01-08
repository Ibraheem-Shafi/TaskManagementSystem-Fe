import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userLogin } from './../../Server/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await userLogin({ email, password });
      // if (response.data.token) {
      //   localStorage.setItem("authToken", response.data.token);
      // }
      if (response.data.user.userId) {
        localStorage.setItem("userId", response.data.user.userId);
      }
      let userId = response.data.user.userId;
      navigate(`/dashboard/${userId}`);
    } catch (err) {
      setError(err.response ? err.response.data.error : 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="form-group">
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="block text-lg font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full p-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-700">Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
