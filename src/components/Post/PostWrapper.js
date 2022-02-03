import { useNavigate } from "react-router-dom";
import FullPage from "@assets/DisplayFullPage";
import Post from "./Post";
import { ReactComponent as ShareLogo } from '../../assets/logos/share.svg'
import './PostWrapper.css'
import * as Hammer from 'hammerjs'
import { useEffect, useRef, useState } from "react";

function PostWrapper() {
   const keyHandler = (e) => {
      if (e.keyCode === 37) tryGoingLeft() //left
      if (e.keyCode === 39) tryGoingRight() //right
   }
   const tryGoingLeft = () => console.log("I went Left");
   const tryGoingRight = () => {
      console.log("I went Right");
      change((activePost) => ++activePost);
      changeN((next) => ++next);
      changeB((before) => ++before);
   };
   const allPosts = [1, 2, 3, 4, 5]
   const [showPosts, addToShow] = useState([])
   const [activePost, change] = useState(1)
   const [before, changeB] = useState(null)
   const [next, changeN] = useState(2)
   const navigate = useNavigate();
   const fp = useRef()
   useEffect(() => {
      fp.current.focus();
      // console.log(fp);
   })
   return (<FullPage>
      <div ref={fp} tabIndex={1}
         onKeyDown={keyHandler} className="fullPage--inner">
         <a onClick={() => navigate(-1)} className="hover-white navigate-back">
            Go Back
         </a>
         <div className="wrap">
            <button className="btn navigator" onClick={tryGoingLeft}>
               <ShareLogo />
            </button>
            <div className="swipePosts">
               {before ? <Post id={before} /> : <div></div>}
               <Post id={activePost} active />
               {next ? <Post id={next} /> : <Post noPost={true} />}
            </div>
            <button className="btn navigator" onClick={tryGoingRight}>
               <ShareLogo />
            </button>
         </div>
         {/* <MiniPosts /> */}
      </div>
   </FullPage >);
}

export default PostWrapper;