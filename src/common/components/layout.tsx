import type { PropsWithChildren } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import { Header } from '@/common/components/header';
import { useLayoutStore } from '../hooks/use-layout-store';

export const Layout = ({ children }: PropsWithChildren) => {
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
        navigationHide={navigationHidden}
        navigationOpen={navigationOpen}
        toolsHide={toolsHidden}
        toolsOpen={toolsOpen}
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
