import { Outlet } from "react-router-dom";
import { Layout } from "@/components/layout";

export const App = () => (
  <Layout>
    <Outlet />
  </Layout>
);
