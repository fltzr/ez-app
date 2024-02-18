import { Outlet } from 'react-router-dom';
import Layout from '@/components/layout';
import { useUserPreferencesEffects } from '@/hooks/use-user-preferences-effects';

export const App = () => {
  useUserPreferencesEffects();

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
