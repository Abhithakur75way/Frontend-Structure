// src/components/Logout.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { clearTokens } from '../../redux/authSlice';
import { Button } from '@mui/material';

const Logout: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearTokens()); // Clear tokens from Redux and local storage
    alert('Logged out successfully');
  };

  return (
    <Button onClick={handleLogout} variant="contained" color="secondary">Logout</Button>
  );
};

export default Logout;