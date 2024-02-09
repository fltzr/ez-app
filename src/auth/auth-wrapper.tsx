import { Loader } from "@/components/loader";
import { RouteError } from "@/components/route-error";
import { App } from "../app";
import { useAuthRestore } from "./hooks/use-auth-restore";

export const AuthWrapper = () => {
  const status = useAuthRestore();

  if (status.loading) {
    console.log(`Loader @ AuthWrapper:8`);

    return <Loader />;
  }

  if (status.error) {
    console.log(`RouteError @ AuthWrapper:14`);

    return <RouteError />;
  }

  return <App />;
};
