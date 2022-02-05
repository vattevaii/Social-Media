import ProtectedRoute from "./ProtectedRoute";
import PreventedRoute from "./PreventedRoute";

// [+] Pages
import Default from '@components/Default';
// import PostWrapper from './components/Post/PostWrapper';
import PostWrapper from '@components/Post/PostWrapper2';
import Experiment from '@experiment/First'
import { Route, BrowserRouter as Router, Routes, Navigate, Outlet } from "react-router-dom";
import { Suspense, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import Login from "../components/Login";
import Logout from "../components/Login/LogOut";
import Error from "../experiment/LoadError/Error";
import Profile from "../components/Profile";

function RouteingLogic() {
   const { user } = useContext(AuthContext);
   // console.log(refreshToken, accessToken);
   return (
      <Router>
         <Suspense fallback={<div style={{ marginInset: "auto" }}>Loading...</div>}>
            <Routes>
               {/* <Route path={path} element={element} key={index} /> */}
               <Route path="/" element={<Navigate to="/post" />} />
               <Route path="login" element={<Navigate to="/auth/login" />} />
               <Route path="logout" element={<Navigate to="/auth/logout" />} />
               <Route path="/auth" element={<PreventedRoute />}>
                  <Route path="exp" element={<Experiment />} />
                  <Route path="def" element={<Default />} />
                  <Route path="login" element={<Login />} />
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
            </Routes>
         </Suspense>
      </Router>);
}

export default RouteingLogic;