import { type RouteObject, createBrowserRouter } from 'react-router-dom';

import { App } from '@/app';
import { RouteError } from '@/common/components/route-error';

const routes: RouteObject[] = [
  {
    element: <App />,
    errorElement: <RouteError />,
    children: [
      {
        index: true,
        path: '/',
        lazy: () => import('@/features/home'),
      },
      {
        path: 'about',
        element: <div>About</div>,
      },
      {
        path: 'contact',
        element: <div>Contact</div>,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
