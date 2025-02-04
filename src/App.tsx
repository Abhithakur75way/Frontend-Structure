// src/App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './Store';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles'; // Import ThemeProvider
import theme from './theme'; // Import your theme
import Signup from './components/SignUp';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Logout from './components/Logout';
import Navbar from './components/Navbar'; // Import Navbar
import Home from './components/Home'; // Import Home
import { setupListeners } from '@reduxjs/toolkit/query';

setupListeners(store.dispatch);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}> {/* Wrap your app with ThemeProvider */}
        <Router>
          <Navbar /> {/* Add Navbar here */}
          <Routes>
            <Route path="/" element={<Home />} /> {/* Dummy homepage route */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;