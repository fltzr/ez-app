import {
  type RouteObject,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { AuthWrapper } from "@/auth/auth-wrapper";
import { ProtectedRoute } from "@/components/protected-route";
import { RouteError } from "@/components/route-error";

const routes: RouteObject[] = [
  {
    element: <AuthWrapper />,
    errorElement: <RouteError />,
    children: [
      {
        path: "/",
        element: <Navigate replace to="/home" />,
      },
      {
        path: "signin",
        lazy: () => import("@/features/auth/pages/signin"),
      },
      {
        path: "signup",
      },
      {
        path: "register",
      },
      {
        element: <ProtectedRoute />,
        errorElement: <RouteError />,
        children: [
          {
            index: true,
            path: "home",
            lazy: () => import("@/features/home"),
          },
          {
            path: "courtreserve",
            lazy: () => import("@/features/courtreserve/pages/events"),
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
