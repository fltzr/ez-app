import {
  type RouteObject,
  createBrowserRouter,
  Navigate,
} from 'react-router-dom';
import { App } from '@/app/index';
import { AuthenticatedRoute } from '@/auth/authenticated-route';
import { UnauthenticatedRoute } from '@/auth/unauthenticated-route';
import { RouteError } from '@/components/route-error';

const routes: RouteObject[] = [
  {
    element: <App />,
    errorElement: <RouteError />,
    children: [
      {
        path: '/',
        element: <Navigate replace to='/home' />,
      },
      {
        element: <AuthenticatedRoute />,
        errorElement: <RouteError />,
        children: [
          {
            index: true,
            path: 'home',
            lazy: () => import('@/features/home'),
          },
          {
            path: 'courtreserve',
            lazy: () => import('@/features/courtreserve/pages/events'),
          },
          {
            path: 'finances',
            lazy: () => import('@/features/finances/pages/budget-items'),
          },
        ],
      },
      {
        element: <UnauthenticatedRoute />,
        children: [
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
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
