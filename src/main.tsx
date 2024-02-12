import { StrictMode, Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Loader } from '@/components/loader';
import { router } from '@/router/routes';

import '@cloudscape-design/global-styles/index.css';
import './index.css';
import './normalize.scss';
import { Providers } from './app/providers';
import { AuthWrapper } from './auth/auth-wrapper';

const container: HTMLElement | null = document.querySelector('#c');

if (container) {
  createRoot(container).render(
    <StrictMode>
      <Suspense fallback={<Loader />}>
        <AuthWrapper>
          <Providers>
            <RouterProvider router={router} fallbackElement={<Loader />} />
          </Providers>
        </AuthWrapper>
      </Suspense>
    </StrictMode>
  );
}
