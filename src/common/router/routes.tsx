import { type RouteObject, createBrowserRouter, Navigate } from 'react-router-dom';

import { App } from '@/app';
import { RouteError } from '@/common/components/route-error';
import { ProtectedRoute } from '../components/protected-route';

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
