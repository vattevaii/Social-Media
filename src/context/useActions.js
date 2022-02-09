import useToast from "../experiment/MessagesToast/useToast";
import { useCookies } from "react-cookie";
import { useContext } from "react";
import apiClient from '../http-common';
import { useNavigate } from "react-router-dom";
function useActions(context) {
   const { dispatch } = useContext(context);
   const setMessage = useToast(context);
   const [cookies, setCookie, removeCookie] = useCookies(['jwt', 'refresh', 'user']);
   const navigate = useNavigate();
   const foundError = (err) => {
      setMessage(err.response);
      if (err.response.statusText === "Unauthorized") {
         try {
            apiClient.post("/auth/refresh", { token: cookies["refresh"] })
               .then(res => {
                  setCookie("jwt", res.data.accessToken, { path: process.env.REACT_APP_PATH, domain: process.env.REACT_APP_DOMAIN, maxAge: 26000, sameSite: 'None', secure: true });
                  setCookie("refresh", res.data.refreshToken, { path: process.env.REACT_APP_PATH, domain: process.env.REACT_APP_DOMAIN, maxAge: 2600000, sameSite: 'None', secure: true });
                  dispatch({ type: "REFRESH_SUCCESS", payload: res.data });
               })
         }
         catch (err) {
            removeCookie("jwt", { path: process.env.REACT_APP_PATH, domain: process.env.REACT_APP_DOMAIN });
            removeCookie("refresh", { path: process.env.REACT_APP_PATH, domain: process.env.REACT_APP_DOMAIN });
            removeCookie("user", { path: process.env.REACT_APP_PATH, domain: process.env.REACT_APP_DOMAIN });
            dispatch({ type: "LOGOUT" });
            navigate("/auth/logIn");
         }
      }
   };
   const regSuccess = (res) => {
      // console.log("hey there.. are you seeing the message");
      try {
         setMessage(res, "Register Successful", "LogIn to access your profile");
         navigate('/')
      }
      catch (e) { console.log("error in Set Message") }
   };
   const loginSuccess = (res) => {
      console.log("hey there.. are you seeing the message");
      try { setMessage(res, "Login Successful", "Logged In Successfully"); }
      catch (e) { console.log("error in Set Message") }
      setCookie("jwt", res.data.accessToken, { path: process.env.REACT_APP_PATH, domain: process.env.REACT_APP_DOMAIN, maxAge: 26000, sameSite: 'None', secure: true });
      setCookie("refresh", res.data.refreshToken, { path: process.env.REACT_APP_PATH, domain: process.env.REACT_APP_DOMAIN, maxAge: 2600000, sameSite: 'None', secure: true });
      setCookie("user", res.data.user, { path: process.env.REACT_APP_PATH, domain: process.env.REACT_APP_DOMAIN, maxAge: 26000, sameSite: 'None', secure: true });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      console.log(process.env.REACT_APP_DOMAIN);
      navigate("/");
   }
   const logoutSuccess = (res) => {
      setMessage(res, "Logout Successful", "You have been logged out successfully");
      removeCookie("jwt", { path: process.env.REACT_APP_PATH, domain: process.env.REACT_APP_DOMAIN });
      removeCookie("refresh", { path: process.env.REACT_APP_PATH, domain: process.env.REACT_APP_DOMAIN });
      removeCookie("user", { path: process.env.REACT_APP_PATH, domain: process.env.REACT_APP_DOMAIN });
      console.log("hey there.. are you seeing the message? I've cleared the cookies");
      dispatch({ type: "LOGOUT" });
      navigate("/auth/logIn");
   }
   return { foundError, loginSuccess, logoutSuccess, regSuccess };
}

export default useActions;