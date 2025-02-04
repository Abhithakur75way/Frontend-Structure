// src/features/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: UserState = {
  accessToken: null,
  refreshToken: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      setTokens: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
        if (action.payload.accessToken && action.payload.refreshToken) {
          state.accessToken = action.payload.accessToken;
          state.refreshToken = action.payload.refreshToken;
          localStorage.setItem("accessToken", action.payload.accessToken);
          localStorage.setItem("refreshToken", action.payload.refreshToken);
        } else {
          console.warn("Invalid tokens received:", action.payload);
        }
      },
      clearTokens: (state) => {
        state.accessToken = null;
        state.refreshToken = null;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      },
    },
  });
  

export const { setTokens, clearTokens } = userSlice.actions;
export default userSlice.reducer;