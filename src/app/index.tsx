import { Outlet } from 'react-router-dom';
import { Providers } from '@/app/providers';
import { Layout } from '@/common/components/layout';

export const App = () => (
  <Providers>
    <Layout>
      <Outlet />
    </Layout>
  </Providers>
);
