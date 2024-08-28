
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../authSlice';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  const handleLogin = () => {
    if (!validateEmail(username)) {
      toast.error('Invalid email address');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }
      dispatch(login({ username }));
      toast.success('Login successful!');
      navigate('/');
    
  };

  return (
    <div className="max-w-md p-6 mx-auto mt-10 bg-white rounded-lg shadow-md">
      <h2 className="mb-6 text-2xl font-bold">Login</h2>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700">
          Username
        </label>
        <input
          type="text"
          id="username"
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          placeholder='Enter Your Email'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-bold text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          placeholder='Enter Your Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          onClick={handleLogin}
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;