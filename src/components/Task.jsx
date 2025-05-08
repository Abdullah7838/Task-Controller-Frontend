import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Task(props) {
     const [heading, setHeading] = useState('');
     const [paras, setPara] = useState('');
     const [count, setCount] = useState(0);

     const navigate = useNavigate();
     let email = props.email;

const submitForm =async(e)=>{
         e.preventDefault();
         if(count===1){
          toast.info('Task Already Saved');
          return;
         }
        try{
        let para = paras.trim();
        const res =await axios.post('http://localhost:3001/post-task',{email,heading,para});
        console.log(heading);
        console.log(para);
        toast.success('Saved Successfully');
        setCount(1);
        setTimeout(() => {
            setCount(0);
            navigate('/')
        },1000);
    }catch(e){
        console.log(e)
        toast.error(e.response.status);
    }
     }

  return (
    <div>
      <div>
        <form onSubmit={submitForm} className="bg-white p-6 rounded-2xl shadow-md max-w-md mx-auto space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            📝 Add a Task
          </h2>

          <input
           onChange={(e)=>{setHeading(e.target.value)}}
            type="text"
            required
            placeholder="Add heading here..."
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            onChange={(e)=>{setPara(e.target.value)}}
        //   maxLength=200}
            rows={8}
            type="text"
            required
            placeholder="Add task detail..."
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-200"
          >
            Add Task
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Task;
