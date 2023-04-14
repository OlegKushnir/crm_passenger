import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { useAuth } from "../contexts/AuthContext";
import PropTypes from "prop-types";


export default function PublicRoute({
  restricted = false,
  redirectTo = "/",
}) {
  const { firestoreUser } = useAuth();
  const shouldNavigate = firestoreUser && restricted;

  return shouldNavigate ? (
    <Navigate to={redirectTo} />
  ) : (
    <Suspense fallback={null}>
      <Outlet />
    </Suspense>
  );
}

PublicRoute.propTypes = {
  restricted: PropTypes.bool.isRequired,
  redirectTo: PropTypes.string,
};
