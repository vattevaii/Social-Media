import { ReactComponent as Love } from '@assets/logos/love.svg'
import { useEffect, useRef } from "react";
import "./Like.css"
function LikeButton({ like, height, likeMe, className }) {
   const btn = useRef();
   useEffect(() => {
      if (height) btn.current.style.height = height;
      // btn.current.style.width = width;
      // btn.current.children[1].style.fontSize = height;
   })
   return (<button className={`like ${like} glassModel ${className}`} onClick={likeMe}
      ref={btn}>
      <Love />
      {/* <div className="text"></div> */}
      <svg viewBox={`0 0 ${like ? 34 : 24} 18`}>
         <text x="0" y="14">{like ? "Loved" : "Like"}</text>
      </svg>
   </button>);
}

export default LikeButton;