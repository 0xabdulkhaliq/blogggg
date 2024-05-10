import { useAuth } from "../context/AuthenticationContext";
import { Navigate, Outlet } from "react-router-dom";

export default function Admin() {
  const { user } = useAuth();

  if (user && user.isAdmin) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
}
