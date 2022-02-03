import { useContext } from "react";
import { useMutation } from "react-query";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import useActions from "../context/useActions";
import apiClient from '../http-common'
import { useCookies } from "react-cookie";

// import { useCookies } from "react-cookie"
function ProtectedRoute() {
   const { accessToken, refreshToken } = useContext(AuthContext);
   const [cookies] = useCookies('jwt')
   const location = useLocation();
   // const [, setCookie] = useCookies()
   // console.log(location);
   const { foundError, logoutSuccess } = useActions(AuthContext);
   const { isLoading: logoutLoad, mutate: logOut } = useMutation("logOut",
      () => apiClient.post("/auth/logout",
         { token: refreshToken }),
      {
         onSuccess: (res) => logoutSuccess(res),
         onError: (err) => {
            console.log(err.response.statusText);
            foundError(err);
         }
      }
   )
   if (!cookies.jwt)
      return <Navigate to="/auth/logIn" state={{ from: location }} />
   return <>
      <nav style={{ zIndex: 99 }}>
         {!logoutLoad ?
            <button onClick={logOut}>Logout</button> : <button disabled>Loading..</button>}
      </nav>
      <Outlet />
   </>
}

export default ProtectedRoute;