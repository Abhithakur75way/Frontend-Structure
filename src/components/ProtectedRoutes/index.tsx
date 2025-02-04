// src/components/ProtectedRoute.tsx
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import type { RootState } from '../../Store'; // Adjust the import path as necessary

const ProtectedRoute = () => {
  const { accessToken } = useSelector((state: RootState) => state.user); // Adjust the state path based on your user slice
  return accessToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;