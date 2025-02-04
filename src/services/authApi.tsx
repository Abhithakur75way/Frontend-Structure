// src/features/userApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setTokens } from '../redux/authSlice';

interface IUser {
  name: string;
  email: string;
  password: string;
}

interface ILogin {
  email: string;
  password: string;
}

interface IForgotPassword {
  email: string;
}

interface IResetPassword {
  token: string;
  newPassword: string;
}

interface IRefreshToken {
  refreshToken: string;
}

const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/auth' }),
  endpoints: (builder) => ({
    register: builder.mutation<void, IUser>({
      query: (user) => ({
        url: '/register',
        method: 'POST',
        body: user,
      }),
    }),
    login: builder.mutation<{ accessToken: string; refreshToken: string }, ILogin>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),

     
    forgotPassword: builder.mutation<void, IForgotPassword>({
      query: (data) => ({
        url: '/forgot-password',
        method: 'POST',
        body: data,
      }),
    }),
    resetPassword: builder.mutation<void, IResetPassword>({
      query: (data) => ({
        url: '/reset-password',
        method: 'POST',
        body: data,
      }),
    }),
    refreshTokens: builder.mutation<{ accessToken: string; refreshToken: string }, IRefreshToken>({
      query: (data) => ({
        url: '/refresh-token',
        method: 'POST',
        body: data,
      }),
      // Handle successful token refresh
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setTokens(data)); // Store new tokens in the user slice
        } catch (error) {
          console.error('Token refresh failed', error);
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useRefreshTokensMutation,
} = userApi;

export default userApi;