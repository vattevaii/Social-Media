import ProtectedRoute from "./ProtectedRoute";
import PreventedRoute from "./PreventedRoute";

// [+] Pages
import Default from '@components/Default';
// import PostWrapper from './components/Post/PostWrapper';
import PostWrapper from '../components/Post/PostWrapper2';
import Experiment from '../experiment/First'
import { Route, BrowserRouter as Router, Routes, Navigate, Outlet } from "react-router-dom";
import { Suspense, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import Login from "../components/Login";
import Logout from "../components/Login/LogOut";
import Error from "../experiment/LoadError/Error";
import Profile from "../components/Profile";
import Signup from "../components/Login/SignUp";

function RouteingLogic() {
   const { user } = useContext(AuthContext);
   // console.log(refreshToken, accessToken);
   return (
      <Router>
         <Suspense fallback={<div style={{ marginInset: "auto" }}>Loading...</div>}>
            <Routes>
               {/* <Route path={path} element={element} key={index} /> */}
               <Route path={process.env.REACT_APP_PATH} element={<Outlet />}>
                  <Route path="" element={<Navigate to={process.env.REACT_APP_PATH + "/post"} />} />
                  <Route path="login" element={<Navigate to={process.env.REACT_APP_PATH + "/auth/login"} />} />
                  <Route path="logout" element={<Navigate to={process.env.REACT_APP_PATH + "/auth/logout"} />} />
                  <Route path="signup" element={<Navigate to={process.env.REACT_APP_PATH + "/auth/signup"} />} />
                  <Route path="/auth" element={<PreventedRoute />}>
                     <Route path="exp" element={<Experiment />} />
                     <Route path="def" element={<Default />} />
                     <Route path="login" element={<Login />} />
                     <Route path="signup" element={<Signup />} />
                  </Route>
                  <Route element={<ProtectedRoute />}>
                     <Route path="profile" element={<Profile />} />
                     <Route path="def" element={<Default />} />
                     <Route path="post" element={<Outlet />}>
                        <Route path="" element={<PostWrapper />} />
                        <Route path=":username" element={<PostWrapper />} />
                     </Route>
                     <Route path="auth/logout" element={<Logout />} />
                  </Route>
                  <Route path="*" element={<Error>No Such Page Present</Error>} />
                  {/* <Route path="/login" element={user ? <Navigate replace to="/" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate replace to="/" /> : <Register />} /> */}
               </Route>
            </Routes>
         </Suspense>
      </Router>);
}

export default RouteingLogic;