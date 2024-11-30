
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Task } from './Task';

const TaskList = () => {
  const [tasks, setTasks] = useState([]); // Holds the list of tasks
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error state
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token'); // JWT token
      const res = await axios.get('http://localhost:5000/api/tasks', {
        headers: { 'x-auth-token': token },
      });
      console.log(res.data);
      setTasks(res.data); // Update tasks in state
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch tasks. Please log in again.');
      setLoading(false);
    }
  };

  // Fetch all tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Delete a task
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
          headers: { 'x-auth-token': token },
        });
        // setTasks(tasks.filter((task) => task._id !== id)); // Remove the deleted task from state
        alert('Task deleted successfully.');
        fetchTasks();
      } catch (err) {
        alert('Failed to delete task.');
      }
    }
  };

  // Navigate to the update page
  const handleUpdate = (id) => {
    navigate(`/tasks/${id}/edit`); // Navigate to an edit route with the task ID
  };
  // Navigate to the update page
  const handleShowDetails = (id) => {
    navigate(`/tasks/${id}`); // Navigate to an edit route with the task ID
  };

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Task List</h2>
      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            // <li key={task._id}>
            <div key={task._id} className={task.priority}>
              {/* <strong>{task.title}</strong> - {task.dueDate} - {task.status} */}
              <Task task={task}/>
              <button onClick={() => handleShowDetails(task._id)}>Show Details</button>
              <button onClick={() => handleUpdate(task._id)}>Edit</button>
              <button onClick={() => handleDelete(task._id)}>Delete</button>
            </div>
            // {/* </li> */}
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;

