import React, { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskTable from './components/TaskTable';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=20')
      .then(response => {
        const fetchedTasks = response.data.map(task => ({
          id: task.id,
          title: task.title,
          description: 'N/A',
          status: task.completed ? 'Done' : 'To Do',
        }));
        setTasks(fetchedTasks);
      });
  }, []);

  const handleUpdateTasks = (updatedTasks, actionMessage) => {
    setTasks(updatedTasks);
    toast.success(actionMessage);
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const taskCounts = {
    'To Do': tasks.filter(task => task.status === 'To Do').length,
    'In Progress': tasks.filter(task => task.status === 'In Progress').length,
    'Done': tasks.filter(task => task.status === 'Done').length,
  };

  return (
    <div className="container mt-5">
<center>     <h2 className="text-center mb-4">Task List Manager</h2></center> 

      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search by Title or Description..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <TaskForm tasks={tasks} setTasks={handleUpdateTasks} />
      <TaskTable tasks={filteredTasks} setTasks={handleUpdateTasks} />

      <div className="task-counters d-flex justify-content-around mt-4">
        <div className="task-counter">📝 To Do: {taskCounts['To Do']}</div>
        <div className="task-counter">🚧 In Progress: {taskCounts['In Progress']}</div>
        <div className="task-counter">✅ Done: {taskCounts['Done']}</div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default App;
