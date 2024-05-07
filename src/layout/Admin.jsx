import { useAuth } from "../context/AuthenticationContext";
import { Navigate, Outlet } from "react-router-dom";

export default function Admin() {
  const { user } = useAuth();

  if (user && user.isAdmin) {
    return <Outlet />;
    //return <Posts postInitLimit={3} showTags={true} isAdmin={true} />;
  } else {
    return <Navigate to="/" />;
  }
}
