import FullPage from "@assets/DisplayFullPage";
import { useContext, useRef } from "react";
import { useMutation } from "react-query";
// import { useCookies } from "react-cookie";
import { AuthContext } from "../../context/auth.context";
import apiClient from "../../http-common"
import "./Form.css"
import useActions from "../../context/useActions";
import { Link } from "react-router-dom";

function Signup() {
   const mail = useRef();
   const username = useRef();
   const pwd = useRef();
   const conditions = useRef();
   // const [, setCookie] = useCookies(["jwt", "refresh", "user"]);
   const { regSuccess, foundError } = useActions(AuthContext);
   // const { dispatch } = useContext(AuthContext)
   const { isLoading, error, success, mutate: logIn } = useMutation("logIn",
      () => apiClient.post("/auth/register",
         { username: username.current.value, email: mail.current.value, password: pwd.current.value }
      ), {
      onSuccess: (res) => {
         // console.log(res);
         try { regSuccess(res); }
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
      if (conditions.current.checked === true)
         logIn()
      else
         conditions.current.nextSibling.classList.toggle("error", true)
   }
   return (<>
      <nav>
         <div className="logo">BeSocial Logo in middle</div>
      </nav>
      <FullPage>
         <form className="normform glassModel form" onSubmit={submitHandler} method="post">
            <h2><Link to={"/login"}>Login</Link>/Register</h2>
            <label htmlFor="email">Username :</label>
            <input type="text" name="username" ref={username} />
            <label htmlFor="email">E-Mail :</label>
            <input type="email" name="email" ref={mail} />
            <label htmlFor="pwd">Password :</label>
            <input type="password" name="pwd" ref={pwd} />
            <input type="checkbox" name="agree" ref={conditions} />
            <label htmlFor="agree" onClick={() => conditions.current.click()}>I agree to all terms and conditions</label>
            {isLoading ? <button className="inline-buttons" disabled>Loading..</button> : <input type="submit" />}
         </form>
      </FullPage>
   </>);
}

export default Signup;