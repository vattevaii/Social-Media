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
                  setCookie("jwt", res.data.accessToken, { path: '/', maxAge: 26000, sameSite: 'None', secure: true });
                  setCookie("refresh", res.data.refreshToken, { path: '/', maxAge: 2600000, sameSite: 'None', secure: true });
                  dispatch({ type: "REFRESH_SUCCESS", payload: res.data });
               })
         }
         catch (err) {
            removeCookie("jwt", { path: "/" });
            removeCookie("refresh", { path: "/" });
            removeCookie("user", { path: "/" });
            dispatch({ type: "LOGOUT" });
            navigate("/auth/logIn");
         }
      }
   };
   const loginSuccess = (res) => {
      console.log("hey there.. are you seeing the message");
      try { setMessage(res); }
      catch (e) { console.log("error in Set Message") }
      setCookie("jwt", res.data.accessToken, { path: '/', maxAge: 26000, sameSite: 'None', secure: true });
      setCookie("refresh", res.data.refreshToken, { path: '/', maxAge: 2600000, sameSite: 'None', secure: true });
      setCookie("user", res.data.user, { path: '/', maxAge: 26000, sameSite: 'None', secure: true });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/");
   }
   const logoutSuccess = (res) => {
      setMessage(res);
      removeCookie("jwt", { path: "/" });
      removeCookie("refresh", { path: "/" });
      removeCookie("user", { path: "/" });
      console.log("hey there.. are you seeing the message? I've cleared the cookies");
      dispatch({ type: "LOGOUT" });
      navigate("/auth/logIn");
   }
   return { foundError, loginSuccess, logoutSuccess };
}

export default useActions;