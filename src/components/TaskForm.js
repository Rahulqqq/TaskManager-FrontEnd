import React, { useState } from 'react';
import axios from 'axios';
import TaskList from './TaskList';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('low');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/tasks',
        { title, description, dueDate, priority },
        { headers: { 'x-auth-token': token } }
      );
      alert('Task added successfully');
      window.location.href = '/dashboard';
    } catch (err) {
      alert('Error adding task');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Task</h2>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="high">High Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="low">Low Priority</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
