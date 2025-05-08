import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup({onLogin}) {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const navigate = useNavigate();

    const Signup1 =async(e)=>{
        e.preventDefault();
        try{
        const res = await axios.post('http://localhost:3001/signup',{email,pass});
        onLogin(email);
        toast.success('Signup successfully');
        navigate('/home');
       }catch(e){
        console.log(e);
        toast.error(e.response.status);
      }
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={Signup1} className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Create an Account</h2>

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
          Sign Up
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Log in</a>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Signup;
