import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Store";
import { logout } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold text-gray-800">Welcome to Dashboard</h1>
        {user ? (
          <>
            <p className="text-gray-600 mt-2">Hello, <span className="font-semibold">{user.name}</span>!</p>
            <p className="text-gray-600">Email: {user.email}</p>
          </>
        ) : (
          <p className="text-gray-600 mt-2">User not found</p>
        )}
        <button
          onClick={handleLogout}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
