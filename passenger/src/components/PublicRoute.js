import { Navigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";

export default function PublicRoute({
  children,
  restricted = false,
  redirectTo = '/'
}) {
  const { currentUser } = useAuth();
  const shouldNavigate = !currentUser && restricted;
  return shouldNavigate ? children : <Navigate to={redirectTo} />
  
}