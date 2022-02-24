import { useEffect, useState } from "react";
import "./PostLogo.css"
function Logo ({ person, className, clickHandler, noticeNum }) {
   const postImg = "https://www.tampabay.com/resizer/F6a4F-PmD39_2LAXpoNy25z0Xa4=/852x1064/smart/arc-anglerfish-arc2-prod-tbt.s3.amazonaws.com/public/IAA5NSWHEQI6TBKNIBWI6S7HAY.jpg"
   const postNum = noticeNum ? noticeNum : 0;
   // console.log(person);
   const [classes, setClasses] = useState("personlogo")
   useEffect(() => {
      setClasses(className === undefined ? classes : `${classes} ${className}`)
   }, [className, person])
   return (
      <div className={classes} onClick={clickHandler !== undefined ? clickHandler : null}>
         {postNum > 0 ? <div className="notice">{postNum}</div> : ""}
         <div className="roundImg">
            <img src={!person.profilePicture ? postImg : "/api/images/download/" + person.profilePicture} alt={person.username === undefined ? 'Picture of person' : person.name} />
         </div>
         {person.username === undefined ? 'Loading...' : <div className="name">{person.username}</div>}
      </div>);
}

export { Logo };