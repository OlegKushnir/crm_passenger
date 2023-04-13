import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebookSquare, FaPhone } from "react-icons/fa";
import { ButtonGroup, Button } from "react-bootstrap";

const AuthButtons = ({setLoading,setErr}) => {
  const { googleLogin, facebookLogin } = useAuth();

  const navigate = useNavigate();

  async function handleGoogleLogin(event) {
    event.preventDefault();
    try {
      setLoading(true);
      await googleLogin();
      navigate("/home");
    } catch (error) {
      setErr(error.message);
    }
    setLoading(false);
  }

  async function handleFacebookLogin(event) {
    event.preventDefault();
    try {
      setLoading(true);
      await facebookLogin();
      navigate("/home");
    } catch (error) {
      setErr(error.message);
    }
    setLoading(false);
  }

  async function handlePhoneLogin() {
    navigate("/phonelogin");
  }

  return (
            <ButtonGroup
              aria-label="Basic example"
              className="d-flex justify-content-center mt-4"
            >
              <Button variant="secondary" onClick={handleGoogleLogin}>
                <FaGoogle />
              </Button>
              <Button variant="secondary" onClick={handleFacebookLogin}>
                <FaFacebookSquare />
              </Button>
              <Button variant="secondary" onClick={handlePhoneLogin}>
                <FaPhone />
              </Button>
            </ButtonGroup>
  );
};
export default AuthButtons;
