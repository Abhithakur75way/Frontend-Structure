import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";

const ProtectedRoute = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  return accessToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
