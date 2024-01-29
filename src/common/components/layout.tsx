import type { PropsWithChildren } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import { Header } from '@/common/components/header';
import { Navigation } from '@/common/components/navigation';
import { useAuthStore } from '@/common/stores/use-auth-store';
import { useLayoutStore } from '@/common/stores/use-layout-store';

export const Layout = ({ children }: PropsWithChildren) => {
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
