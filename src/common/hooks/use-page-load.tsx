import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader } from '@/components/loader';
import { usePageloadMutation } from '@/features/auth/hooks/use-auth-api';
import { useAuthStore } from '@/stores/use-auth-store';
import { useNotificationStore } from '@/stores/use-notification-store';

export const usePageload = () => {
  const navigate = useNavigate();

  const pageloadMutation = usePageloadMutation();
  const setAuthState = useAuthStore(state => state.setAuthState);
  const addNotification = useNotificationStore(state => state.addNotification);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await pageloadMutation.mutateAsync();
        const { isAuthenticated, user } = response;

        setAuthState({ isAuthenticated, user });

        if (isAuthenticated) {
          addNotification({
            type: 'success',
            id: `notification-user-authenticated-${Date.now()}`,
            header: 'Authenticated',
            dismissible: true,
            autoDismiss: true,
          });
        } else {
          console.log(`Navigating to /signin @ use-page-load:32`);
          navigate('/signin', { replace: true });
        }
      } catch (error) {
        console.error(error);

        addNotification({
          type: 'error',
          id: `notification-user-not-authenticated-${Date.now()}`,
          header: 'Not authenticated. Please sign in.',
          dismissible: true,
        });
        console.log(`Navigating to /signin @ use-page-load:44`);
        navigate('/signin', { replace: true });
      } finally {
        setAuthState({ isInitialized: true });
      }
    };

    verifySession().catch(error => {
      console.error(`Error verifying session: ${error}`);
    });
  }, [pageloadMutation, setAuthState, navigate, addNotification]);

  // Render Loader while checking the authentication status
  if (pageloadMutation.isIdle || pageloadMutation.isPending) {
    return <Loader />;
  }

  // No return of <Navigate/> here, as navigation is handled within useEffect
  return null;
};
