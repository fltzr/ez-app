import { StrictMode } from 'react';
import { RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { router } from '@/common/router/routes';

import '@cloudscape-design/global-styles/index.css';
import './index.css';
import { Loader } from './common/components/loader';

const container: HTMLElement | null = document.querySelector('#c');

if (container) {
  createRoot(container).render(
    <StrictMode>
      <RouterProvider router={router} fallbackElement={<Loader />} />
    </StrictMode>
  );
}
