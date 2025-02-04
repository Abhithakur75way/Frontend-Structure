// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#009688', // Teal
    },
    secondary: {
      main: '#ff5722', // Deep Orange
    },
    background: {
      default: '#f4f4f4', // Light Gray
      paper: '#ffffff', // White for paper components
    },
    text: {
      primary: '#333333', // Dark Gray for primary text
      secondary: '#555555', // Medium Gray for secondary text
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      color: '#009688', // Teal for headings
    },
    h2: {
      fontWeight: 600,
      color: '#ff5722', // Deep Orange for subheadings
    },
  },
  spacing: 8, // Default spacing unit
});

export default theme;