import { Navigate } from "react-router-dom";
import { isAuthenticated, getUser } from "../utils/auth.utils";
import type { ReactNode } from "react";

type PublicRouteProps = {
  children: ReactNode;
};

const PublicRoute = ({ children }: PublicRouteProps) => {
  if (isAuthenticated()) {
    const user = getUser();
    const target = user?.role === "admin" ? "/admin/dashboard" : "/employee/dashboard";
    return <Navigate to={target} replace />;
  }

  return children;
};

export default PublicRoute;
