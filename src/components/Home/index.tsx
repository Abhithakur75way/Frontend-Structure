// src/components/Home.tsx
import React from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(8), // Add padding to avoid overlap with the navbar
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
  },
  welcomeText: {
    color: theme.palette.primary.main, // Use primary color for welcome text
  },
}));

const Home: React.FC = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h4" align="center" className={classes.welcomeText}>
              Welcome to My Application
            </Typography>
            <Typography variant="body1" align="center" style={{ marginTop: '10px' }}>
              This is a simple homepage. Use the navigation bar to log in or sign up.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;