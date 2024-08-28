import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  const validatePassword = (password) => {
    return password.length >= 6;
  }

  const handleRegister = () => {
    if(!validateEmail(username)) {
      toast.error("Invalid email address");
      return;
    }
    if(!validatePassword(password)) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

      const users = JSON.parse(localStorage.getItem("users")) || [];
      users.push({ username, password });
      localStorage.setItem("users", JSON.stringify(users));
      navigate("/login");
      toast.success("Registration successful!");
    
  };

  return (
    <div className="max-w-md p-6 mx-auto mt-10 bg-white rounded-lg shadow-md">
      <h2 className="mb-6 text-2xl font-bold">Register</h2>
      <div className="mb-4">
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor="username"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          placeholder="Enter Your Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor="password"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          placeholder="Enter Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          onClick={handleRegister}
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
