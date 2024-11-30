import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TaskEdit = () => {
  const { id } = useParams(); // Get task ID from the route
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: '',
    status: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch task details on component mount
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/api/tasks/${id}`, {
          headers: { 'x-auth-token': token },
        });
        console.log("get response:", res.data);
        setFormData({
          title: res.data.title,
          description: res.data.description,
          dueDate: res.data.dueDate.split('T')[0], // Format for input type="date"
          priority: res.data.priority,
          status: res.data.status,
        });
        console.log("updated form data", formData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch task details.');
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit updated task
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/tasks/${id}`, formData, {
        headers: { 'x-auth-token': token },
      });
      alert('Task updated successfully.');
      navigate('/dashboard'); // Redirect to dashboard after updating
    } catch (err) {
      alert('Failed to update task.');
    }
  };

  if (loading) return <p>Loading task details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit}>
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
      </form>
    </div>
  );
};

export default TaskEdit;
