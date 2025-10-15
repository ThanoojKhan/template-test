import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../Molecules/Navbar";
import Sidebar from "../Molecules/Sidebar";

function ProtectedRoutes() {
  const { authenticated } = useSelector((state) => state.auth);
  const location = useLocation();

  if (authenticated === null) return null;

  return authenticated ? (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 overflow-auto p-6" style={{ height: "calc(100vh - 80px)" }}>
          <Outlet />
        </main>
      </div>
    </div>
  ) : (
    <Navigate to={"/login"} state={{ from: location.pathname }} replace />
  );
}

export default ProtectedRoutes;
