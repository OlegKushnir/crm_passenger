import { Navigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute({  allowedRoles }) {
  const location = useLocation();
  const { firestoreUser, currentUser } = useAuth();
  if(!firestoreUser?.role) return;

  return currentUser && allowedRoles?.includes(firestoreUser?.role) ? (
    <Suspense fallback={null}>
        <Outlet />
      </Suspense>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace/>
  );
}
