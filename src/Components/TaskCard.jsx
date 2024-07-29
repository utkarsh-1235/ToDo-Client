import React from 'react';
import axios from '../Config/axios'

const TaskCard = ({ task, setTasks, draggableProps, dragHandleProps, innerRef }) => {
  const deleteTask = async () => {
    const response = await axios.delete(`/api/v1/tasks/${task._id}`);  
    console.log(response);
  };

  return (
    <div
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
      className="p-4 mb-4 bg-white rounded-md shadow-md"
    >
      <h3 className='text-lg  text-gray-500'>{task.title}</h3>
      <p className='text-sm text-gray-500 text-left m-4'>{task.description}</p>
      <span
        className={`${
          task.priority === 'Urgent'
            ? 'bg-red-400'
            : task.priority === 'Medium'
            ? 'bg-yellow-400 text-sm'
            : 'bg-green-400'
        } rounded-md text-white px-2 py-1`}
      >
        {task.priority}
      </span>
     <button onClick={deleteTask} className="ml-4 bg-gray-500 text-white rounded-md px-2">Delete</button>
    </div>
  );
};

export default TaskCard;
