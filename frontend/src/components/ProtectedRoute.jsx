import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ role }) {
  if (role === "student") {
    const student = localStorage.getItem("student");
    return student ? <Outlet /> : <Navigate to="/student-login" />;
  }

  if (role === "admin") {
    const admin = localStorage.getItem("admin");
    return admin ? <Outlet /> : <Navigate to="/admin/login" />;
  }

  return <Navigate to="/" />;
}

export default ProtectedRoute;
