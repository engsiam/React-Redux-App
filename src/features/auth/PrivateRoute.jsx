import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUser } from '../authSlice';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const user = useSelector(selectUser);

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
