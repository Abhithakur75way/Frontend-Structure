import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../Store";
import { setTokens, logout } from "../redux/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/api/users",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const accessToken = state.auth.accessToken;

    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }

    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    console.log("Access token expired, trying refresh...");
    
    const state = api.getState() as RootState;
    const refreshToken = state.auth.refreshToken;

    if (!refreshToken) {
      console.log("No refresh token found, logging out.");
      api.dispatch(logout());
      return result;
    }

    const refreshResponse = await baseQuery(
      {
        url: "/refresh",
        method: "POST",
        body: { refreshToken }, // Ensure refresh token is being sent properly
      },
      api,
      extraOptions
    );

    if (refreshResponse.data) {
      const { accessToken, refreshToken: newRefreshToken } = refreshResponse.data;

      // Store the new tokens in Redux & localStorage
      api.dispatch(setTokens({ accessToken, refreshToken: newRefreshToken }));
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", newRefreshToken);

      // Retry the original request with the new access token
      result = await baseQuery(
        {
          ...args,
          headers: {
            ...args.headers,
            Authorization: `Bearer ${accessToken}`, // Ensure updated token is used
          },
        },
        api,
        extraOptions
      );
    } else {
      console.log("Refresh token expired, logging out.");
      api.dispatch(logout());
    }
  }

  return result;
};


export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
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
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/reset-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSignupMutation, useLoginMutation, useForgotPasswordMutation, useResetPasswordMutation } = authApi;
