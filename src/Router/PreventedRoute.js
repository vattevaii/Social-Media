import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useCookies } from "react-cookie";
function PreventedRoute() {
   const { accessToken } = useContext(AuthContext);
   const [cookies] = useCookies('jwt')
   const location = useLocation();
   if (!!cookies.jwt)
      return <Navigate to="/post" state={{ from: location }} />
   return <Outlet />
}

export default PreventedRoute;