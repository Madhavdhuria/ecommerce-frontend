import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
  isAuthenticated: boolean;
  children?: ReactElement;
  AdminOnly?: boolean;
  Admin?: boolean;
  redirect?: string;
}
const Protectedroute = ({
  isAuthenticated,
  children,
  AdminOnly,
  Admin,
  redirect = "/",
}: Props) => {
  if (!isAuthenticated) {
    return <Navigate to={redirect} />;
  }

  if (AdminOnly && !Admin) {
    return <Navigate to={redirect} />;
  }

  return children ? children : <Outlet />;
};

export default Protectedroute;
