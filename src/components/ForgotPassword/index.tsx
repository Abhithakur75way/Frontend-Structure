// src/components/ForgotPassword.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForgotPasswordMutation } from '../../services/authApi';
import { TextField, Button, Typography } from '@mui/material';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
});

const ForgotPassword: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const [forgotPassword] = useForgotPasswordMutation();

  const onSubmit = async (data: any) => {
    await forgotPassword(data).unwrap();
    alert('Password reset email sent');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4">Forgot Password</Typography>
      <TextField {...register('email')} label="Email" error={!!errors.email} helperText={errors.email?.message} fullWidth />
      <Button type="submit" variant="contained" color="primary">Send Reset Link</Button>
    </form>
  );
};

export default ForgotPassword;