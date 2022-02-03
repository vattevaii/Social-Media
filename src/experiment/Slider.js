// DEFECTIVE SLIDER ALERT

import { ReactComponent as ShareLogo } from '../assets/logos/share.svg'
import './Slider.css'
import * as Hammer from 'hammerjs'
import { useEffect, useRef, useState } from 'react';

function SlideItem({ data, children }) {
   return (data === null ?
      <div className="slide--item none"></div>
      :
      <div className={`slide--item`}>
         {children}
      </div>);
}

function Slider({ children }) {
   const [initPos, changePos] = useState();
   const swipe = (ref, final) => {
      console.log("here i am!!");
      const childWidth = ref.children[0].offsetWidth;
      const min = 5 / 2 * childWidth - ref.offsetWidth / 2;
      const max = ref.scrollWidth - min - childWidth;
      const present = ref.scrollLeft;
      const finalPos = min + (final - 1) * childWidth;
      let scrollAmount = finalPos - present;
      let timer = Math.abs(scrollAmount)
      console.log(scrollAmount)
      // console.log(finalPos + "-" + present + " " + scrollAmount + "    " + timer);
      if (scrollAmount === 0) return;
      var slideTimer = setInterval(function () {
         if (timer <= 0 || ref.scrollLeft < min || ref.scrollLeft > max) {
            window.clearInterval(slideTimer);
         }
         ref.scrollLeft += Math.floor(scrollAmount / 20);
         timer -= Math.floor(Math.abs(scrollAmount) / 20);
      }, 1);
   }
   const tryGoingLeft = () => {
      console.log("I went Left" + initPos);
      if (initPos <= 1) return;
      changePos((initPos) => --initPos)
      swipe(slideItems.current, initPos);
   };
   const tryGoingRight = () => {
      console.log("I went Right " + initPos);
      if (initPos >= 3) return;
      changePos((initPos) => ++initPos)
      swipe(slideItems.current, initPos);
   }
   const items = [null, null, 1, 2, 3, null, null]
   const slider = useRef();
   const slideItems = useRef();
   useEffect(() => {
      var hammerTime = new Hammer(slider.current);
      hammerTime.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL })
      hammerTime.on('swipeleft', tryGoingRight);
      hammerTime.on('swiperight', tryGoingLeft);
      //make 3rd element starting element
      changePos(1)
      swipe(slideItems.current, 1);
   }, []);
   useEffect(() => {
      swipe(slideItems.current, initPos);
      // slideItems.current.scrollLeft = 100;
   }, [initPos])
   return (<div className="slider" ref={slider}>
      <button className="btn navigator" onClick={tryGoingLeft}>
         <ShareLogo />
      </button>
      <div className="slide--items" ref={slideItems}>
         {items.map((item, index) => <SlideItem key={index} data={item} />)}
      </div>
      <button className="btn navigator" onClick={tryGoingRight}>
         <ShareLogo />
      </button>
   </div>);
}

export default Slider;