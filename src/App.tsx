import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./components/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

export default function App() {
  return (
    <>
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </>
  );
}