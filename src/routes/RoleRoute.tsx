import { Navigate } from "react-router-dom";

import { AUTH_TOKEN_KEY, ROLE_KEY } from "../constants/auth.constants";
import type { ReactNode } from "react";
import type { AuthRole } from "../types/auth";

type RoleRouteProps = {
  children: ReactNode;
  allowedRole: AuthRole;
};

function RoleRoute({ children, allowedRole }: RoleRouteProps) {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const role = localStorage.getItem(ROLE_KEY);

  if (!token || !role) {
    return <Navigate to="/login" replace />;
  }

  if (role !== allowedRole) {
    const redirect =
      role === "admin"
        ? "/admin/dashboard"
        : role === "employee"
        ? "/employee/dashboard"
        : "/login";

    return <Navigate to={redirect} replace />;
  }

  return children;
}

export default RoleRoute;
