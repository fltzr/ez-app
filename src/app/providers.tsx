import type { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { I18nProvider } from '@cloudscape-design/components/i18n';
import messages from '@cloudscape-design/components/i18n/messages/all.all';
import { ThemeAndStyleProvider } from '@/components/theme-and-style-provider';

const queryClient = new QueryClient();

export const Providers = ({ children }: PropsWithChildren) => (
  <ThemeAndStyleProvider>
    <QueryClientProvider client={queryClient}>
      <I18nProvider locale="en" messages={[messages]}>
        {children}
      </I18nProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </ThemeAndStyleProvider>
);
