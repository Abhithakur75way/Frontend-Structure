// src/components/ResetPassword.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useResetPasswordMutation } from '../../services/authApi';
import { TextField, Button, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const schema = yup.object().shape({
  newPassword: yup.string().required('New password is required').min(8).max(32)
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[\W]/, 'Password must contain at least one special character'),
});

const ResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const [resetPassword] = useResetPasswordMutation();

  const onSubmit = async (data: any) => {
    await resetPassword({ token: token!, newPassword: data.newPassword }).unwrap();
    alert('Password reset successfully');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4">Reset Password</Typography>
      <TextField {...register('newPassword')} label="New Password" type="password" error={!!errors.newPassword} helperText={errors.newPassword?.message} fullWidth />
      <Button type="submit" variant="contained" color="primary">Reset Password</Button>
    </form>
  );
};

export default ResetPassword;