import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserName } from '../../redux/store';
import { logout } from '../../redux/operations/operations';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUserName);
  return (
    <>
      <div variant="h6" component="div" sx={{ flexGrow: 1 }}>
        <span>{user}</span>
        <NavLink to="contacts">
          <span>Contacts</span>
        </NavLink>
      </div>

      <button
        type="button"
        onClick={() => dispatch(logout(user))}
      >
        Logout
      </button>
    </>
  );
};
