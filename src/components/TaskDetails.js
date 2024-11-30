
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TaskDetails = () => {
  const { id } = useParams(); // Get the task ID from the route
  const navigate = useNavigate(); // For navigation
  const [task, setTask] = useState(null); // State to hold task details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error state
  const [isEditing, setIsEditing] = useState(false); // State for edit mode
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: '',
    status: '',
  });

  // Fetch task details on component mount
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/api/tasks/${id}`, {
          headers: { 'x-auth-token': token },
        });
        setTask(res.data);
        setFormData({
          title: res.data.title,
          description: res.data.description,
          dueDate: res.data.dueDate.split('T')[0], // Extract date part
          priority: res.data.priority,
          status: res.data.status,
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to load task details.');
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  // Handle form changes for editing
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit updated task details
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`http://localhost:5000/api/tasks/${id}`, formData, {
        headers: { 'x-auth-token': token },
      });
      setTask(res.data); // Update task details
      setIsEditing(false); // Exit edit mode
      alert('Task updated successfully.');
    } catch (err) {
      alert('Failed to update task.');
    }
  };

  // Delete the task
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
          headers: { 'x-auth-token': token },
        });
        alert('Task deleted successfully.');
        navigate('/dashboard'); // Navigate back to dashboard
      } catch (err) {
        alert('Failed to delete task.');
      }
    }
  };

  if (loading) return <p>Loading task details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Task Details</h2>
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Due Date:
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Priority:
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              required
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </label>
          <label>
            Status:
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </label>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <p><strong>Title:</strong> {task.title}</p>
          <p><strong>Description:</strong> {task.description}</p>
          <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
          <p><strong>Priority:</strong> {task.priority}</p>
          <p><strong>Status:</strong> {task.status}</p>
          <button onClick={() => setIsEditing(true)}>Edit Task</button>
          <button onClick={handleDelete}>Delete Task</button>
        </>
      )}
      <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
    </div>
  );
};

export default TaskDetails;
