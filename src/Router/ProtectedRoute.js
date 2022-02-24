import { useContext, useEffect } from "react";
import { useMutation } from "react-query";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import useActions from "../context/useActions";
import apiClient from '../http-common'
import { useCookies } from "react-cookie";
import { Logo } from "../components/Person/PersonMini";
import Dropdown from "../experiment/StaticDropdown/DropDown";
import List from "../experiment/List";

// import { useCookies } from "react-cookie"
function ProtectedRoute () {
   const { accessToken, refreshToken } = useContext(AuthContext);
   const [cookies,] = useCookies(['jwt', 'user'])
   const { dispatch } = useContext(AuthContext);
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
            console.log(err.response.status + " " + err.response.statusText);
            foundError(err);
         }
      }
   )
   if (!cookies.jwt)
      return <Navigate to="/auth/logIn" state={{ from: location }} />
   return <>
      <nav className="profile dark expand">
         <div className="main">
            <span className="hover-dark">SocMed</span>
         </div>
         <Dropdown>
            <Dropdown.Visible>
               <Logo person={cookies.user} className="dark no-bg" />
            </Dropdown.Visible>
            <Dropdown.Focus className={"glassModel dark"}>
               <List className="navList">
                  <li><Link to="/post2">My Posts</Link></li>
                  <li><Link to="/profile">Profile</Link></li>
                  <li><Link to="/auth/logout">Logout</Link></li>
               </List>
            </Dropdown.Focus>
         </Dropdown>
      </nav>
      <Outlet />
   </>
}

export default ProtectedRoute;