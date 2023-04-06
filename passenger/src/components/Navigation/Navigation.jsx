import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from '../../redux/store';
import { UserMenu } from './UserMenu';
import { AuthNav } from './AuthNav';

const Navigation = () => {
  const isLoggedIn = useSelector(getIsLoggedIn)
  return (
    <>
    <div>
      <div position="static">
        <div>
          {isLoggedIn ? <UserMenu /> : <AuthNav/>}
        </div>
      </div>
    </div>
      
      <div>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
        </div>
        
    </>
  );
};
export default Navigation;