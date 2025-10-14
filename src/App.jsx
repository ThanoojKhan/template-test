import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import { setAuthenticated } from "./redux/slices/authSlice";
import ProtectedRoutes from "./components/Atoms/ProtectedRoutes";
import LoginPage from "./pages/login/Login";
import RegisterPage from "./pages/registerPage.jsx/Register";
import Dashboard from "./pages/controlPanel/DashboardPage";
import ErrorPage from "./pages/404Page/ErrorPage";
import CompanyDetails from "./pages/controlPanel/CompanyDetailsPage";

const App = () => {
  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAuthenticated(isAuthenticated()));
  }, [isAuthenticated, dispatch]);

  return (
    <Routes>
      {/* Login page */}
      <Route path="/login" element={<LoginPage />} />

      {/* Register page */}
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="company/:id" element={<CompanyDetails />} />
      </Route>

      {/* 404 page */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
