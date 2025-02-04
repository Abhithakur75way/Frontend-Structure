// src/components/Signup.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRegisterMutation } from "../../services/authApi";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { setTokens } from "../../redux/authSlice"; // Import setTokens
import { useNavigate } from "react-router-dom"; // Import useNavigate

// Extend MUI Theme for makeStyles
declare module "@mui/styles/defaultTheme" {
  interface DefaultTheme extends Theme {}
}

// **🎨 Define Styles using makeStyles**
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.light})`,
  },
  card: {
    width: "100%",
    maxWidth: 400, // Set a max width for the card
    padding: theme.spacing(4),
    boxShadow: theme.shadows[5],
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
  },
  title: {
    textAlign: "center",
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
  },
  inputField: {
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    fontWeight: theme.typography.fontWeightBold,
    padding: theme.spacing(1.5),
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    color: theme.palette.common.white,
    "&:hover": {
      background: `linear-gradient(90deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
    },
  },
}));

// **📝 Validation Schema**
const schema = yup.object().shape({
  name: yup.string().required("Name is required").min(2).max(50),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8)
    .max(32)
    .matches(/\d/, "Must contain at least one number")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[\W]/, "Must contain at least one special character"),
});

const Signup: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [registerUser ] = useRegisterMutation();

  const onSubmit = async (data: any) => {
    try {
      const response = await registerUser (data).unwrap();
      const { accessToken, refreshToken } = response.data; // Adjust based on your API response structure

      // Dispatch tokens to Redux
      dispatch(setTokens({ accessToken, refreshToken }));
      toast.success("User  created successfully!"); // Show success toast

      // Redirect to login page
      navigate("/login"); // Redirect to login page after signup
    } catch (error) {
      toast.error("Failed to create user. Please try again."); // Show error toast
    }
  };

  return (
    <Container className={classes.container}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h4" className={classes.title}>
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box className={classes.inputField}>
              <TextField
                {...register("name")}
                label="Name"
                error={!!errors.name}
                helperText={errors.name?.message}
                fullWidth
              />
            </Box>
            <Box className={classes.inputField}>
              <TextField
                {...register("email")}
                label="Email"
                error={!!errors.email}
                helperText={errors.email?.message}
                fullWidth
              />
            </Box>
            <Box className={classes.inputField}>
              <TextField
                {...register("password")}
                label="Password"
                type="password"
                error={!!errors.password}
                helperText={errors.password?.message}
                fullWidth
              />
            </Box>
            <Button type="submit" variant="contained" fullWidth className={classes.submitButton}>
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
      <ToastContainer /> {/* Add ToastContainer for notifications */}
    </Container>
  );
};

export default Signup;