import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/users" }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: "/signup",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation<{ message: string }, { email: string }>({
      query: (data) => ({
        url: "/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation<{ message: string }, { token: string; newPassword: string }>({
      query: (data) => ({
        url: "/reset-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSignupMutation, useLoginMutation, useForgotPasswordMutation, useResetPasswordMutation } = authApi;
