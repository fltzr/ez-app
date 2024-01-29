import { type RouteObject, createBrowserRouter, Navigate } from 'react-router-dom';

import { App } from '@/app';
import { ProtectedRoute } from '@/components/protected-route';
import { RouteError } from '@/components/route-error';

const routes: RouteObject[] = [
  {
    element: <App />,
    errorElement: <RouteError />,
    children: [
      {
        path: '/',
        element: <Navigate replace to="/home" />,
      },
      {
        path: 'signin',
        lazy: () => import('@/features/auth/pages/signin'),
      },
      {
        path: 'signup',
      },
      {
        path: 'register',
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            path: 'home',
            lazy: () => import('@/features/home'),
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
