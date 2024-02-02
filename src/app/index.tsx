import { Outlet } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { usePageload } from '@/hooks/use-page-load';

export const App = () => {
  usePageload();

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
