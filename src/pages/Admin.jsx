import { useAuth } from "../context/AuthenticationContext";
import { Navigate } from "react-router-dom";
export default function Admin() {
  const { user } = useAuth();

  if (user && user.isAdmin) {
    return <h1>Admin Page</h1>;
  } else {
    return <Navigate to="/" />;
  }
}
