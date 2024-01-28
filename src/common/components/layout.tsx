import type { PropsWithChildren } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import { Header } from '@/common/components/header';

export const Layout = ({ children }: PropsWithChildren) => (
  <>
    <Header />
    <AppLayout content={children} headerSelector="#h" />
  </>
);
