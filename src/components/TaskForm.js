
import React, { useState } from 'react';

const TaskForm = ({ tasks, setTasks }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');

  const handleAddTask = () => {
    if (title.trim() === '') return;

    
    const maxId = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) : 0;

    const newTask = {
      id: maxId + 1,
      title,
      description,
      status,
    };

    setTasks([...tasks, newTask], 'Task added successfully!');

    // Reset form fields
    setTitle('');
    setDescription('');
    setStatus('To Do');
  };

  return (
    <div className="mb-4">
      <div className="d-flex mb-2">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="form-control me-2"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="form-select me-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <button className="btn btn-primary" onClick={handleAddTask}>
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TaskForm;
