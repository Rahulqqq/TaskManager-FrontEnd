import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Check for user token
  return token ? children : <Navigate to="/" />;
};



const token = localStorage.getItem('token');

const fetchProtectedData = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/protected-route', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Include the token here
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch');
    }

    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err.message);
    alert('Please log in again');
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
};


export default ProtectedRoute;
