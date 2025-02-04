// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import userApi from './services/authApi'; // Adjust the import path as necessary
import userReducer from './redux/authSlice'; // Import your user slice

// Create the store
export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    user: userReducer, // Add your user reducer here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

// Export the RootState type
export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);