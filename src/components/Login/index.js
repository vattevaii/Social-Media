import FullPage from "@assets/DisplayFullPage";
import { useContext, useRef } from "react";
import { useMutation } from "react-query";
// import { useCookies } from "react-cookie";
import { AuthContext } from "../../context/auth.context";
import apiClient from "../../http-common"
import "./Form.css"
import useActions from "../../context/useActions";

function Login() {
   const mail = useRef();
   const pwd = useRef();
   // const [, setCookie] = useCookies(["jwt", "refresh", "user"]);
   const { loginSuccess, foundError } = useActions(AuthContext);
   // const { dispatch } = useContext(AuthContext)
   const { isLoading, error, success, mutate: logIn } = useMutation("logIn",
      () => apiClient.post("/auth/login",
         { email: mail.current.value, password: pwd.current.value }
      ), {
      onSuccess: (res) => {
         // console.log(res);
         try { loginSuccess(res); }
         catch (e) { console.log(e) }
         // console.log("Login Success");
      },
      onError: (err) => {
         console.log(err.response.statusText);
         foundError(err)
      }
   }
   );

   const submitHandler = (e) => {
      e.preventDefault();
      logIn()
   }
   return (<>
      <nav>
         <div className="logo">BeSocial Logo in middle</div>
      </nav>
      <FullPage>
         <form className="normform glassModel form" onSubmit={submitHandler} method="post">
            <label htmlFor="email">E-Mail :</label>
            <input type="email" name="email" ref={mail} />
            <label htmlFor="pwd">Password :</label>
            <input type="password" name="pwd" ref={pwd} />
            {isLoading ? <button className="inline-buttons" disabled>Loading..</button> : <input type="submit" />}
         </form>
      </FullPage>
   </>);
}

export default Login;