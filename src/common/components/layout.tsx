import type { PropsWithChildren } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import { Header } from '@/components/header';
import { Navigation } from '@/components/navigation';
import { usePageload } from '@/hooks/use-page-load';
import { useAuthStore } from '@/stores/use-auth-store';
import { useLayoutStore } from '@/stores/use-layout-store';
import { Notification } from './notification';

export const Layout = ({ children }: PropsWithChildren) => {
  usePageload();

  const user = useAuthStore(state => state.user);
  const { navigationHidden, navigationOpen, toolsHidden, toolsOpen, setState } =
    useLayoutStore(state => ({
      navigationHidden: state.navigationHidden,
      navigationOpen: state.navigationOpen,
      toolsHidden: state.toolsHidden,
      toolsOpen: state.toolsOpen,
      setState: state.setState,
    }));

  return (
    <>
      <Header />
      <AppLayout
        content={children}
        headerSelector="#h"
        notifications={<Notification />}
        navigationWidth={250}
        navigationHide={user ? navigationHidden : true}
        navigationOpen={user ? navigationOpen : false}
        navigation={<Navigation />}
        toolsHide={user ? toolsHidden : true}
        toolsOpen={user ? toolsOpen : false}
        onNavigationChange={event => {
          setState({ navigationOpen: event.detail.open });
        }}
        onToolsChange={event => {
          setState({ toolsOpen: event.detail.open });
        }}
      />
    </>
  );
};
