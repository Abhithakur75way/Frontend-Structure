// src/components/Login.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLoginMutation } from "../../services/authApi";
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
import { useDispatch } from "react-redux";
import { setTokens } from "../../redux/authSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { log } from "console";

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
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Move useNavigate here
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [loginUser ] = useLoginMutation();

  const onSubmit = async (data: any) => {
    try {
      const response = await loginUser (data).unwrap();
      console.log("Login response:", response); // Log the response
  
      // Extract tokens from the response
      const { accessToken, refreshToken } = response.data;
  
      if (accessToken && refreshToken) {
        dispatch(setTokens({ accessToken, refreshToken })); // Store tokens in Redux
        toast.success("Login successful!"); // Show success toast
        navigate("/"); // Redirect to homepage
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Login failed. Please check your credentials."); // Show error toast
    }
  };

  return (
    <Container className={classes.container}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h4" className={classes.title}>
            Login
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
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
            <Button
              type="submit"
              variant="contained"
              fullWidth
              className={classes.submitButton}
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
      <ToastContainer /> {/* Add ToastContainer for notifications */}
    </Container>
  );
};

export default Login;