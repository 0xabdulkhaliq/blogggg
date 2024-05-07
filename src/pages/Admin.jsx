import { useAuth } from "../context/AuthenticationContext";
import { Navigate } from "react-router-dom";
import Posts from "../components/Posts";

export default function Admin() {
  const { user } = useAuth();

  if (user && user.isAdmin) {
    return <Posts postInitLimit={3} showTags={true} isAdmin={true} />;
  } else {
    return <Navigate to="/" />;
  }
}
