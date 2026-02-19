// import React, { useState } from 'react';
// import { login } from '../utils/api';

// const Login = () => {
//   const [formData, setFormData] = useState({ email: '', password: '' });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await login(formData);
//       localStorage.setItem('token', res.data.token);
//       // Redirect to dashboard
//       window.location.href = '/#/dashboard';
//     } catch (error) {
//       console.error(error);
//       alert('Login failed');
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
//         <h2 className="text-2xl mb-4">Admin Login</h2>
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           className="w-full p-2 mb-4 border rounded"
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           className="w-full p-2 mb-4 border rounded"
//           required
//         />
//         <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useContext, useEffect } from 'react';
import { login } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user, login: authLogin } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;
    navigate('/dashboard');
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = formData.email.trim().toLowerCase();
    const password = formData.password;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    if (!emailRegex.test(email)) {
      setError('Enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      const res = await login({ email, password });
      authLogin(res.data);
      setSuccess('Login successful. Redirecting...');
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      const message =
        error?.response?.data?.message ||
        'Login failed. Please check your credentials.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-4">Login</h2>
        {error && (
          <div className="mb-4 p-3 text-sm rounded border border-red-200 bg-red-50 text-red-700">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 text-sm rounded border border-green-200 bg-green-50 text-green-700">
            {success}
          </div>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          minLength={6}
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white p-2 rounded disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;

