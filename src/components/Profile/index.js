import { useContext, useRef } from "react";
import { useCookies } from "react-cookie";
import { AuthContext } from "../../context/auth.context";
import { Logo } from "../Person/PersonMini";
import FindFriends from "./FindFriends";
import "./Profile.css";

function Profile () {
   const nav = useRef();
   const [cookies] = useCookies(["user"]);
   const user = cookies.user;
   const changeClass = () => {
      nav.current.classList.toggle("expand")
   }
   return (<>
      <FindFriends />
      <button onClick={changeClass}>MAGIC!!</button>
   </>);
}

export default Profile;