import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import apiClient from "../../http-common";
import useActions from "../../context/useActions";
import { AuthContext } from "../../context/auth.context";
import { useContext, useEffect } from "react";

function Logout() {
   const { refreshToken } = useContext(AuthContext);
   const { logoutSuccess, foundError } = useActions(AuthContext);
   const navigate = useNavigate();
   const { isLoading: logoutLoad, success, error, mutate: logOut } = useMutation("logOut",
      () => apiClient.post("/auth/logout",
         { token: refreshToken }),
      {
         onSuccess: (res) => {
            logoutSuccess(res)
            navigate("/auth/logIn");
         },
         onError: (err) => {
            console.log(err.response.statusText);
            foundError(err);
            navigate("/error")
         }
      }
   )
   useEffect(() => {
      console.log("Logout");
      if (!!refreshToken)
         logOut()
   }, [refreshToken])

   return (<>Processing...</>);
}

export default Logout;