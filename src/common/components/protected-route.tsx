import { Navigate, Outlet } from "react-router-dom";
import { useAuthData } from "@/auth/hooks/use-auth-data";

export const ProtectedRoute = () => {
  const auth = useAuthData();

  if (!auth.authenticated || !auth.account) {
    console.log(`Navigate to /signin @ ProtectedRoute:5`);

    return <Navigate to="/signin" />;
  }

  return <Outlet />;
};
