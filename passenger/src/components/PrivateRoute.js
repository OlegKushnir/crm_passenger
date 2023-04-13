import { Navigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { useAuth } from "../contexts/AuthContext";

// export default function PrivateRoute({ children }) {
//   const { currentUser, role } = useAuth();
//   console.log("role", role);
//   const location = useLocation();

//   return currentUser ? (
//     children
//   ) : (
//     <Navigate to="/login" state={{ from: location }} replace />
//   );
// }

export default function PrivateRoute({  allowedRoles }) {
  const location = useLocation();
  const { firestoreUser, currentUser } = useAuth();
  if(!firestoreUser?.role) return;
  console.log("private role", firestoreUser.role);
  return currentUser && allowedRoles?.includes(firestoreUser.role) ? (
    <Suspense fallback={null}>
        <Outlet />
      </Suspense>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace/>
  );
}
