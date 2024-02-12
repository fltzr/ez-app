import type { PropsWithChildren } from 'react';
import { Loader } from '@/components/loader';
import { RouteError } from '@/components/route-error';
import { useAuthRestore } from './hooks/use-auth-restore';

export const AuthWrapper = ({ children }: PropsWithChildren) => {
  const status = useAuthRestore();

  if (status.loading) {
    return <Loader />;
  }

  if (status.error) {
    return <RouteError />;
  }

  return <>{children}</>;
};
