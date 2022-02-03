import { useEffect, useState } from "react";
import "./PostLogo.css"
function Logo({ person, className, clickHandler }) {
   const postImg = "https://www.tampabay.com/resizer/F6a4F-PmD39_2LAXpoNy25z0Xa4=/852x1064/smart/arc-anglerfish-arc2-prod-tbt.s3.amazonaws.com/public/IAA5NSWHEQI6TBKNIBWI6S7HAY.jpg"
   const postNum = 3;
   const [classes, setClasses] = useState("personlogo")
   useEffect(() => {
      setClasses(className === undefined ? classes : `${classes} ${className}`)
   }, [className])
   return (
      <div className={classes} onClick={clickHandler !== undefined ? clickHandler : null}>
         {postNum > 0 ? <div className="notice">{postNum}</div> : ""}
         <div className="roundImg">
            <img src={postImg} alt={person.name === undefined ? 'Picture of person' : person.name} />
         </div>
         {person.name === undefined ? '' : <div className="name">{person.name}</div>}
      </div>);
}

export { Logo };