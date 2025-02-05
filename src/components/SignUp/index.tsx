import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button, Container, Typography, Box, IconButton, InputAdornment, Link } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSignupMutation } from "../../services/authApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme {}
}

// ✅ Styles using useStyles
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    padding: theme.spacing(3),
  },
  formBox: {
    padding: theme.spacing(4),
    borderRadius: "16px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "#ffffff",
  },
  title: {
    fontWeight: 700,
    marginBottom: theme.spacing(3),
    color: "#2d3748",
    fontSize: "1.75rem",
  },
  inputField: {
    marginBottom: theme.spacing(3),
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
    },
  },
  button: {
    padding: theme.spacing(1.5),
    fontWeight: 600,
    fontSize: "1rem",
    borderRadius: "8px",
    textTransform: "none",
    boxShadow: "none",
  },
  link: {
    fontWeight: 500,
    color: "#4a5568",
    "&:hover": {
      color: "#2d3748",
    },
  },
}));

// ✅ Validation Schema
const signupSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

interface ISignupForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Signup() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  const { register, handleSubmit, formState: { errors, isValid } } = useForm<ISignupForm>({
    resolver: yupResolver(signupSchema),
    mode: "onChange",
  });

  const [signup, { isLoading }] = useSignupMutation();

  const handleTogglePassword = (field: "password" | "confirmPassword") => {
    field === "password"
      ? setShowPassword(!showPassword)
      : setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit: SubmitHandler<ISignupForm> = async (data) => {
    try {
      await signup({ ...data, active: true }).unwrap();
      toast.success("Account created successfully! Redirecting to login in 5 seconds...");

      let timeLeft = 5;
      setCountdown(timeLeft);

      const timerInterval = setInterval(() => {
        timeLeft -= 1;
        setCountdown(timeLeft);
        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          navigate("/login"); // Redirect after countdown
        }
      }, 1000);
    } catch (error: any) {
      toast.error(error?.data?.message || "Registration failed");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Container maxWidth="xs" className={classes.container}>
        <Box className={classes.formBox}>
          <Typography variant="h1" className={classes.title}>
            Create Account
          </Typography>

          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <TextField
              fullWidth
              label="Full Name"
              variant="outlined"
              className={classes.inputField}
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <TextField
              fullWidth
              label="Email Address"
              type="email"
              variant="outlined"
              className={classes.inputField}
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              className={classes.inputField}
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => handleTogglePassword("password")}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              variant="outlined"
              className={classes.inputField}
              {...register("confirmPassword")}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => handleTogglePassword("confirmPassword")}>
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.button}
              type="submit"
              disabled={isLoading || !isValid}
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Button>

            {countdown !== null && (
              <Typography variant="body2" color="textSecondary" align="center" mt={2}>
                Redirecting in {countdown} seconds...
              </Typography>
            )}

            <Box mt={3} textAlign="center">
              <Typography variant="body2" className={classes.link}>
                Already have an account?{" "}
                <Link href="/login" color="primary" underline="hover" fontWeight={600}>
                  Log in
                </Link>
              </Typography>
            </Box>
          </motion.form>
        </Box>  
      </Container>
    </motion.div>
  );
}
