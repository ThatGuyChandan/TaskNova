import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from './redux/store';

const PrivateRoute = () => {
  const { token } = useSelector((state: RootState) => state.auth);

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
