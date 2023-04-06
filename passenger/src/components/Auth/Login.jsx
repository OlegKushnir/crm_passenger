import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/operations/operations';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const dispatch = useDispatch();
    const submitForm = e => {
      e.preventDefault();
      dispatch(login({ email, password }));
      setEmail('');
      setPassword('');
    };
  
    return (
        <div elevation={3}  >
        <h2>Login</h2>
        <form onSubmit={submitForm} >
          <input
            onChange={e => setEmail(e.target.value)}
            type="email"
            name="email"
            value={email}
            required
          />
          <input
           onChange={e => setPassword(e.target.value)}
            type="password"
            name="password"
            value={password}
            required
          />
          <button type="submit">
            Login
          </button>
        </form>
        </div>
    );
  };
  export default Login;
  