import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { UserMenu } from "./Navigation/TopMenu/UserMenu";
import { AuthNav } from "./Navigation/TopMenu/AuthNav";
import { useAuth } from "../contexts/AuthContext";

const Layout = () => {
  const { currentUser } = useAuth();

  return (
    <>
      {currentUser ? <UserMenu /> : <AuthNav />}
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </>
  );
};
export default Layout;
