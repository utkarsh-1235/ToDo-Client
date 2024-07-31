import React, { useState, useEffect } from 'react';
import axios from '../Config/axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import { Link } from 'react-router-dom';
import CreateTaskModal from './CreateTaskModel';

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      const userID = localStorage.getItem('userID');
      const response = await axios.get(`/api/v1/tasks/${userID}`);
      setTasks(response.data.data);
      console.log('Fetched Tasks:', response.data.data);
    };
    fetchTasks();
  }, []);

  const onDragEnd = async (result) => {
    console.log('Drag Result:', result);
    const { source, destination } = result;
    if (!destination) return;

    const updatedTasks = Array.from(tasks);
    const [movedTask] = updatedTasks.splice(source.index, 1);
    movedTask.status = destination.droppableId;
    updatedTasks.splice(destination.index, 0, movedTask);

    setTasks(updatedTasks);

    await axios.put(`/api/v1/tasks/${movedTask._id}`, { status: movedTask.status });
  };

  const columns = ['To-Do', 'In Progress', 'Under Review', 'Completed'];

  return (
    <div className="dashboard-container">
      {/* Navigation Section */}
      <div className="sidebar">
        <nav className="navbar">
          <ul>
            <li>Home</li>
            <li>Boards</li>
            <li>Settings</li>
            <li>Teams</li>
            <li>Analytics</li>
          </ul>
          <Link to="/createtask" onClick={() => setShowModal(true)} className="mt-4 px-4 py-2 text-white bg-purple-600 rounded-md">
            Create new task
          </Link>
        </nav>
      </div>
      
      {/* Task Board Section */}
      <div className="main-content">
        <div className="dashboard-header">
          <h1>Good morning, Joe!</h1>
        </div>
        
        {/* Introduction Section */}
        <div className="introduction">
          <div className="tag-section">
            <h3>Introducing tags</h3>
            <p>Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.</p>
          </div>
          <div className="notes-section">
            <h3>Share notes instantly</h3>
            <p>Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options.</p>
          </div>
          <div className="access-section">
            <h3>Access anywhere</h3>
            <p>Sync your notes across all devices. Stay productive whether you're on your phone, tablet, or computer.</p>
          </div>
        </div>
        
        <div className="header-controls">
          <input type="text" placeholder="Search" className="search-bar" />
          <button className="filter-button">Filter</button>
          <button className="calendar-view-button">Calendar View</button>
          <button className="automation-button">Automation</button>
          <button className="share-button">Share</button>
          <Link to='/createtask' onClick={() => setShowModal(true)} className="create-task-button">
            Create Task
          </Link>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="columns-container">
            {columns.map((column) => (
              <Droppable key={column} droppableId={column}>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="column">
                    <h2>{column}</h2>
                    {tasks.filter(task => task.status === column).map((task, index) => {
                      console.log(`Task status: ${task.status}, Column: ${column}`);
                      return (
                        <Draggable key={task._id} draggableId={task._id} index={index}>
                          {(provided) => (
                            <TaskCard
                              task={task}
                              setTasks={setTasks}
                              draggableProps={provided.draggableProps}
                              dragHandleProps={provided.dragHandleProps}
                              innerRef={provided.innerRef}
                            />
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>

      <CreateTaskModal show={showModal} onClose={() => setShowModal(false)} setTasks={setTasks} />
    </div>
  );
};

export default TaskBoard;
