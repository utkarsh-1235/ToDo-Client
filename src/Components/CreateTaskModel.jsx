import React, { useState } from 'react';
import axios from '../Config/axios';
import { Link, useNavigate } from 'react-router-dom';

const CreateTaskModal = ({ show, onClose, setTasks }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'To-Do',
    priority: 'Low',
    deadline: ''
  });

  const {navigate} = useNavigate();

  const handlegoback = (e)=>{
    e.preventDefault(); 
    onClose(); 
    navigate(-1); 
  }
  
  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };
  
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userID = localStorage.getItem('userID');
      const response = await axios.post('/api/v1/tasks/', {...task, user: userID});
    setTasks((prevTasks) => [...prevTasks, response.data.data]);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Create Task</h2>
        <form noValidate>
          <div className="mb-4">
            <label className="block mb-1">Title</label>
            <input 
              type="text" 
              name="title" 
              value={task.title} 
              onChange={handleChange} 
              className="w-full px-4 py-2 border rounded-md" 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Description</label>
            <textarea 
              name="description" 
              value={task.description} 
              onChange={handleChange} 
              className="w-full px-4 py-2 border rounded-md" 
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Priority</label>
            <select 
              name="priority" 
              value={task.priority} 
              onChange={handleChange} 
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Deadline</label>
            <input 
              type="date" 
              name="deadline" 
              value={task.deadline} 
              onChange={handleChange} 
              className="w-full px-4 py-2 border rounded-md" 
            />
          </div>
          <div className="flex justify-end">
            <Link to='#' onClick={handlegoback} className="px-4 py-2 mr-4 border rounded-md">Cancel</Link>
            <button type="submit" onClick={handleSubmit} className="px-4 py-2 text-white bg-blue-600 rounded-md">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;
