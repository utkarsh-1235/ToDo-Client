// src/components/Dashboard.jsx
import React from 'react';
import TaskBoard from '../Components/TaskBoard';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const user = localStorage.getItem('user'); 
  return (
    <div className="flex min-h-screen bg-gray-100">
    
      {/* {/* <div className="flex items-center space-x-4">
            <Link to="/createtask" className="px-4 py-2 mr-5 font-semibold text-white bg-purple-600 rounded-md">Create new task</Link> 
    </div> */}
      <main className="flex-1 p-4">
        <header className="flex items-center justify-between pb-4 border-b">
          {console.log(user)}
          <h1 className="text-2xl font-bold">Good morning, Joe!</h1>
          
        </header>
        <TaskBoard />
      </main>
    </div>
  );
};

export default Dashboard;
