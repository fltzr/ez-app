import { useMutation } from '@tanstack/react-query';
import type { Account } from '@/types/user';
import { api } from '@/utils/axios';
import type { SignInSchemaType } from '../types';

type PageloadResponse = {
  isAuthenticated: boolean;
  user: Account;
};

export const usePageloadMutation = () =>
  useMutation({
    mutationKey: ['pageload-auth'],
    mutationFn: async () => {
      const response = await api.post<PageloadResponse>('/pageload');

      return response.data;
    },
    retry: false,
  });

export const useSigninMutation = () =>
  useMutation({
    mutationFn: async (data: SignInSchemaType) => {
      const response = await api.post<Account>('/signin', data);

      return response.data;
    },
  });

export const useSignoutMutation = () =>
  useMutation({
    mutationFn: async () => {
      const response = await api.post('/signout');

      return response.status;
    },
  });
