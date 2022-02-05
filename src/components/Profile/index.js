import { useRef } from "react";
import { Logo } from "../Person/PersonMini";
import "./Profile.css";

function Profile() {
   const nav = useRef();
   const changeClass = () => {
      nav.current.classList.toggle("expand")
   }
   return (<><nav className="profile dark" ref={nav}>
      <div className="main">
         <span className="hover-dark">SocMed</span>
      </div>
      <div className="sub">
         <Logo person={{ id: 123, name: "SocioPath" }} />
      </div>
   </nav>
      <button onClick={changeClass}>MAGIC!!</button>
   </>);
}

export default Profile;