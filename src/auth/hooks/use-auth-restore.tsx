import { useRef } from 'react';
import { useAsync } from 'react-use';
import { useAuthStore } from '../auth-store';
import { useAuth } from './use-auth';

export const useAuthRestore = () => {
  const { account } = useAuthStore();
  const { pageload } = useAuth();
  const hasRestored = useRef(false);

  const result = useAsync(async () => {
    if (hasRestored.current || account) {
      return;
    }

    await pageload().finally(() => {
      hasRestored.current = true;
    });
  }, []);

  return result;
};
