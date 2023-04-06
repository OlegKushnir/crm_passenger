import { useState } from 'react';
import { register } from '../../redux/operations/operations';
import { useDispatch } from 'react-redux';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const dispatch = useDispatch();
    const submitForm = e => {
      e.preventDefault();
      dispatch(register({ name, email, password }));
      setName('');
      setEmail('');
      setPassword('');
    };
  
    return (
      <div elevation={3}>
      <h2>Registration</h2>
      <form onSubmit={submitForm}>
      <input
          onChange={e => setName(e.target.value)}
          type="text"
          name="name"
          value={name}
          required
        />
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
          Register
        </button>
      </form>
      </div>
    );
  };
  export default Register;