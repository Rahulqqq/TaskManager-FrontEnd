import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './pages/Dashboard';
import TaskDetails from './components/TaskDetails';
import TaskList from './components/TaskList';
import TaskEdit from './components/TaskEdit';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* <Route path="/tasks/:id/edit" element={<TaskEdit />} /> */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/tasks/:id" element={
          <ProtectedRoute>
            <TaskDetails />
          </ProtectedRoute>
        } />
        <Route path="/tasks/:id/edit" element={
          <ProtectedRoute>
            <TaskEdit />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
