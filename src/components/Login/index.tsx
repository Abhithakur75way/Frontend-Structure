import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Link,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useLoginMutation } from "../../services/authApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setTokens, setUser } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

interface ILoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ILoginForm>({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });
  const [login, { isLoading }] = useLoginMutation();

  const handleTogglePassword = () => setShowPassword(!showPassword);

  const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
    try {
      const response = await login(data).unwrap();
  
      console.log("Login Response:", response); // Debugging log
  
      // ✅ Extract user and tokens correctly from response
      const { accessToken, refreshToken, user } = response.data;
  
      if (!user) {
        throw new Error("User data is missing in the response");
      }
  
      dispatch(setTokens({ accessToken, refreshToken }));
      dispatch(setUser({ name: user.name, email: user.email })); // Store user in Redux
  
      // Store the user and tokens in localStorage (as strings)
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
  
      toast.success("Login successful!");
      reset();
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error?.data?.message || "Login failed");
    }
  };
  
  
  
  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 5, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Email"
            {...register("email")}
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            margin="normal"
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            disabled={isLoading || !isValid}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
        <Box sx={{ mt: 2 }}>
          <Link href="/forgot-password">Forgot your password?</Link>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">
            Don't have an account? <Link href="/signup">Sign Up</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
