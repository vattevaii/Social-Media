import { useContext } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useCookies } from "react-cookie";
function PreventedRoute () {
   const { accessToken } = useContext(AuthContext);
   const [cookies] = useCookies('jwt')
   const location = useLocation();
   const navigateTo = useNavigate()
   if (!!cookies.jwt)
      return <Navigate to="/post" state={{ from: location }} />
   return <>
      <nav className="profile dark expand">
         <div className="main">
            <span className="hover-dark">SocMed</span>
         </div>
         <div className="sub">
            <button onClick={() => navigateTo('/auth/login')} style={{ margin: "10px 0", padding: ".5em", fontSize: "1.1em" }}>LogIn</button>
         </div>
      </nav>
      <Outlet /></>
}

export default PreventedRoute;