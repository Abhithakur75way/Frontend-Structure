import { useForm, SubmitHandler } from "react-hook-form";
import { useForgotPasswordMutation } from "../../services/authApi";
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  Alert,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { motion } from "framer-motion";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// ✅ Styles using useStyles
const useStyles = makeStyles({
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
    maxWidth: "450px", // 🔹 Increased width for better input visibility
  },
  button: {
    marginTop: "20px",
    height: "45px",
    width: "100%",
  },
  inputField: {
    width: "100%", // 🔹 Ensures full-width input
    marginBottom: "16px",
  },
  title: {
    fontWeight: 600,
    marginBottom: "15px",
  },
  subTitle: {
    fontSize: "14px",
    marginBottom: "16px",
  },
});

// ✅ Validation Schema using Yup
const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});

// ✅ Interface for Forgot Password Form
interface IForgotPasswordForm {
  email: string;
}

const ForgotPasswordForm = () => {
  const classes = useStyles();
  const [forgotPassword, { isLoading, isError, error, isSuccess }] =
    useForgotPasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IForgotPasswordForm>({
    resolver: yupResolver(forgotPasswordSchema),
    mode: "onChange",
  });

  // ✅ Form Submit Handler
  const onSubmit: SubmitHandler<IForgotPasswordForm> = async (data) => {
    await forgotPassword({ email: data.email });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth="sm" className={classes.formContainer}>
        <Box className={classes.formBox}>
          <Typography variant="h5" className={classes.title}>
            Forgot Password
          </Typography>
          <Typography variant="body2" className={classes.subTitle}>
            Enter your email to receive a password reset link.
          </Typography>
          {isSuccess && (
            <Alert severity="success">
              Check your email for the reset link.
            </Alert>
          )}
          {isError && (
            <Alert severity="error">
              {(error as any)?.data?.message || "Error occurred"}
            </Alert>
          )}

          {/* ✅ Form with react-hook-form */}
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ width: "100%" }} // 🔹 Full width form
          >
            {/* Email Input Field */}
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              type="email"
              className={classes.inputField}
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            {/* Submit Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                disabled={isLoading || !isValid}
                className={classes.button}
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>
            </motion.div>
          </motion.form>
        </Box>
      </Container>
    </motion.div>
  );
};

export default ForgotPasswordForm;
