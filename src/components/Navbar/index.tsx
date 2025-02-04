// src/components/Navbar.tsx
import React from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

declare module "@mui/styles/defaultTheme" {
  interface DefaultTheme extends Theme {}
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    background:
      "linear-gradient(90deg, rgba(103,58,183,1) 0%, rgba(33,150,243,1) 100%)", // Deep Purple to Blue Gradient
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: theme.zIndex.appBar,
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
    color: "#ffffff",
    fontWeight: 700,
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)", // Subtle shadow for better contrast
  },
  buttonLogin: {
    margin: theme.spacing(1),
    color: "#ffffff",
    backgroundColor: theme.palette.primary.main, // Theme Primary Color (Teal)
    boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.3)",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark, // Darker Teal on Hover
    },
  },
  buttonSignUp: {
    margin: theme.spacing(1),
    color: "#ffffff",
    background: "linear-gradient(45deg, #f50057 30%, #651fff 90%)", // Pink to Purple
    boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.3)",
    "&:hover": {
      background: "linear-gradient(45deg, #d500f9 30%, #3d5afe 90%)", // Lighter Pink & Blue on Hover
    },
  },
}));

const Navbar: React.FC = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          My Cool App 🚀
        </Typography>
        <Button
          component={Link}
          to="/login"
          variant="contained"
          className={classes.buttonLogin}
        >
          Login
        </Button>
        <Button
          component={Link}
          to="/signup"
          variant="contained"
          className={classes.buttonSignUp}
        >
          Sign Up
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
