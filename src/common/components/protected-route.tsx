import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores/use-auth-store';

export const ProtectedRoute = () => {
  const user = useAuthStore(state => state.user);

  if (!user) {
    return <Navigate replace to="/signin" />;
  }

  return <Outlet />;
};
