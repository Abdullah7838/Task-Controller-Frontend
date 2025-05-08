import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({onLogin}) {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const navigate = useNavigate();

    const Login1 =async(e)=>{
        e.preventDefault();
        try{
        const res = await axios.post('http://localhost:3001/login',{email,pass})  
        toast.success('Login successfully');
        onLogin(email)
        navigate('/home')
        }catch(e){
        console.log(e);
        toast.error(e.response?.data?.message || "Login failed");
      }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={Login1} className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Welcome Back</h2>

        <input
          onChange={(e)=>{setEmail(e.target.value)}}
          type="email"
          placeholder="Email"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          onChange={(e)=>{setPass(e.target.value)}}
          type="password"
          placeholder="Password"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-200"
        >
          Log In
        </button>

        <p className="text-center text-sm text-gray-600">
          Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign up</a>
        </p>
      </form>
            <ToastContainer />
    </div>
  );
}

export default Login;
