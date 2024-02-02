import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/stores/use-auth-store';
import { Loader } from './loader';

export const ProtectedRoute = () => {
  console.log('In ProtectedRoute');
  const { isInitialized, isAuthenticated } = useAuthStore(state => ({
    isInitialized: state.isInitialized,
    isAuthenticated: state.isAuthenticated,
  }));

  if (!isInitialized) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate replace to="/signin" />;
  }

  return <Outlet />;
};
