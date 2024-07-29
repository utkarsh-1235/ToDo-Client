// CreateTask.js
import React, { useState } from 'react';
import axios from '../Config/axios';
import { toast } from 'react-hot-toast';

const CreateTask = ({ onClose, onTaskCreated }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'To-Do',
    priority: 'Low',
    deadline: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const userID = localStorage.getItem('userID');
      const response = await axios.post('/api/v1/tasks/', {...task, user: userID});
      onTaskCreated(response.data.data);
      toast.success('Task created successfully');
      onClose();
    } catch (err) {
      toast.error('Failed to create task');
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="w-full max-w-md p-6 bg-white rounded-md">
        <h2 className="mb-4 text-2xl font-bold">Create Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="title">Title</label>
            <input type="text" name="title" id="title" value={task.title} onChange={handleInputChange} className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="description">Description</label>
            <textarea name="description" id="description" value={task.description} onChange={handleInputChange} className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="status">Status</label>
            <select name="status" id="status" value={task.status} onChange={handleInputChange} className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600">
              <option value="To-Do">To-Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Under Review">Under Review</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="priority">Priority</label>
            <select name="priority" id="priority" value={task.priority} onChange={handleInputChange} className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600">
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="deadline">Deadline</label>
            <input type="date" name="deadline" id="deadline" value={task.deadline} onChange={handleInputChange} className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" />
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="px-4 py-2 font-medium text-gray-700 bg-gray-200 rounded-md">Cancel</button>
            <button type="submit" className="px-4 py-2 font-medium text-white bg-purple-600 rounded-md">Create Task</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
