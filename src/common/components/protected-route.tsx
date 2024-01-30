import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores/use-auth-store';

export const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate replace to="/signin" />;
  }

  return <Outlet />;
};
