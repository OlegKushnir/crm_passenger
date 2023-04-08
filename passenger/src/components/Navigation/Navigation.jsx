import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { UserMenu } from "./UserMenu";
import { AuthNav } from "./AuthNav";
import { Container } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";

const Navigation = () => {
  const { currentUser } = useAuth();

  return (
    <>
      {currentUser ? <UserMenu /> : <AuthNav />}

      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </div>
      </Container>
    </>
  );
};
export default Navigation;
