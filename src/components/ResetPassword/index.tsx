import { useState } from "react";
import { useResetPasswordMutation } from "../../services/authApi";
import { Button, TextField, Typography, Container, Box, Alert, IconButton, InputAdornment } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSearchParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";

// ✅ Styles using createStyles
const useStyles = makeStyles(() =>
  createStyles({
    formContainer: {
      textAlign: "center",
      paddingTop: "40px",
    },
    formBox: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "25px",
      backgroundColor: "#fff",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      width: "100%",
      maxWidth: "420px",
    },
    button: {
      marginTop: "20px",
      height: "45px",
      width: "100%",
    },
    inputField: {
      width: "100%",
      marginBottom: "16px",
    },
    title: {
      fontWeight: 600,
      marginBottom: "15px",
    },
  })
);

// ✅ Validation Schema using Yup
const resetPasswordSchema = yup.object().shape({
  password: yup.string().min(6, "Password must be at least 6 characters").required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords must match")
    .required("Confirm Password is required"),
});

// ✅ Interface for Reset Password Form
interface IResetPasswordForm {
  password: string;
  confirmPassword: string;
}

const ResetPasswordForm = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetPassword, { isLoading, isError, error, isSuccess }] = useResetPasswordMutation();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<IResetPasswordForm>({
    resolver: yupResolver(resetPasswordSchema),
    mode: "onChange",
  });

  // Toggle password visibility
  const handleTogglePassword = () => setShowPassword(!showPassword);
  const handleToggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  // Form Submit Handler
  const onSubmit: SubmitHandler<IResetPasswordForm> = async (data) => {
    if (token) {
      await resetPassword({ token, newPassword: data.password });
      reset(); // Clear form after successful submission
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Container maxWidth="sm" className={classes.formContainer}>
        <Box className={classes.formBox}>
          <Typography variant="h5" className={classes.title}>
            Reset Password
          </Typography>
          {isSuccess && <Alert severity="success">Password reset successful!</Alert>}
          {isError && <Alert severity="error">{(error as any)?.data?.message || "Error occurred"}</Alert>}

          {/* Form with react-hook-form */}
          <motion.form onSubmit={handleSubmit(onSubmit)} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ width: "100%" }}>
            
            {/* New Password Input */}
            <TextField
              label="New Password"
              fullWidth
              type={showPassword ? "text" : "password"}
              className={classes.inputField}
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.2 }}>
                      <IconButton onClick={handleTogglePassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </motion.div>
                  </InputAdornment>
                ),
              }}
            />

            {/* Confirm Password Input */}
            <TextField
              label="Confirm Password"
              fullWidth
              type={showConfirmPassword ? "text" : "password"}
              className={classes.inputField}
              {...register("confirmPassword")}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.2 }}>
                      <IconButton onClick={handleToggleConfirmPassword} edge="end">
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </motion.div>
                  </InputAdornment>
                ),
              }}
            />

            {/* Submit Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                type="submit" 
                fullWidth 
                variant="contained" 
                className={classes.button} 
                disabled={isLoading || !isValid}
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </Button>
            </motion.div>
          </motion.form>

        </Box>
      </Container>
    </motion.div>
  );
};

export default ResetPasswordForm;
