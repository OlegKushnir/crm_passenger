import { Navigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";

export default function PublicRoute({
  children,
  restricted = false,
  redirectTo = '/'
}) {
  const { firestoreUser } = useAuth();
  const shouldNavigate = !firestoreUser && restricted;

  return shouldNavigate ? children : <Navigate to={redirectTo} />
  
}