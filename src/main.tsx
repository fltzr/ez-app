import { StrictMode } from 'react';
import { RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { router } from '@/common/router/routes';

import './index.css';

const container: HTMLElement | null = document.querySelector('#c');

if (container) {
  createRoot(container).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
