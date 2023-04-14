import { Navigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { useAuth } from "../contexts/AuthContext";
import PropTypes from "prop-types";

export default function PrivateRoute({ allowedRoles }) {
  const location = useLocation();
  const { firestoreUser, currentUser } = useAuth();

  if (!firestoreUser?.role) return;

  return currentUser && allowedRoles?.includes(firestoreUser?.role) ? (
    <Suspense fallback={null}>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

PrivateRoute.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};
