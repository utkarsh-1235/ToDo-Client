
import React from 'react';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import axios from '../Config/axios';


const Login = () => {
    const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
   const navigate = useNavigate();

  const handleFormChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.id]: e.target.value,
    });
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const reqData = JSON.stringify(credentials);
      console.log(reqData)
      const response = await axios.post("/api/v1/users/login", credentials);
      localStorage.setItem('user', response.data.user); // Store user ID
      localStorage.setItem('userID', response.data.user._id); // Store user ID
      localStorage.setItem('token', response.data.token); // Store token if needed
      navigate("/dashboard");
      setCredentials()
      toast.success(response.data.message);
    } catch (err) {
    //   setError(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 to-blue-500">
      <div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-md">
        <h2 className="mb-4 text-2xl font-bold text-center text-purple-700">Welcome to Workflo!</h2>
        <form noValidate>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" onChange={(e)=>handleFormChange(e)} className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="password" onChange={(e)=>handleFormChange(e)} className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" />
          </div>
          <button type="submit" onClick={(e)=>login(e)}
          className="w-full py-2 font-semibold text-white bg-purple-600 rounded-md hover:bg-purple-700">Login</button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account? <a href="/signup" className="text-purple-700 hover:underline">Create a new account.</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
