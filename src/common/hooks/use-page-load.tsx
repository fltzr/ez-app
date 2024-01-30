import { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Loader } from '@/components/loader';
import { useAuthStore } from '@/stores/use-auth-store';
import type { AuthenticatedUser } from '@/types/user';
import { api } from '@/utils/axios';

type PageloadResponse = {
  isAuthenticated: boolean;
  user: AuthenticatedUser;
};

const usePageloadMutation = () =>
  useMutation({
    mutationKey: ['pageload-auth'],
    mutationFn: async () => {
      const response = await api.post<PageloadResponse>('/pageload');

      return response.data;
    },
  });

export const usePageload = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pageloadMutation = usePageloadMutation();
  const setAuthState = useAuthStore(state => state.setAuthState);

  useEffect(() => {
    pageloadMutation.mutate(undefined, {
      onSuccess: ({ isAuthenticated, user }) => {
        if (!isAuthenticated) {
          setAuthState({ isAuthenticated: false, user: null });

          return;
        }
        setAuthState({ isAuthenticated, user });

        if (location.pathname.includes('signin')) {
          navigate('/home', { replace: true });
        }
      },
    });
  }, [pageloadMutation, setAuthState, navigate, location.pathname]);

  if (pageloadMutation.isPending) {
    return <Loader />;
  }

  if (pageloadMutation.isError) {
    return <Navigate replace to="/signin" />;
  }

  return null;
};
