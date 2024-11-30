
import React from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const Dashboard = () => {
  return (
    <div>
      <h1>Task Management Dashboard</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default Dashboard;
