import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel as Flickity } from 'react-responsive-carousel'; import "flickity/css/flickity.css";
import React, { useEffect, useMemo, useState } from 'react';
import "./Slider3.css"

function Slider ({ children, initPos, changePos, nobutton, small }) {
   const [percent, setPercent] = useState(80);
   const [currentSlide, setCurrentSlide] = useState(initPos);
   const [flickOpt, addOpt] = useState({
      centerMode: true,
      onChange: changePos,
      onClickThumb: changePos,
      useKeyboardArrows: false,
      width: "100vw",
      showThumbs: false,
      selectedItem: initPos !== undefined ? initPos : 1,
      showArrows: !!nobutton ? false : true,
      swipeable: true,
      animationHandler: "Fade"
   });
   const check = (e) => {
      if (e.matches) setPercent(100);
      else setPercent(80);
      console.log("check");
   }
   useEffect(() => {
      var x = window.matchMedia("(max-width: 600px)");
      check(x);
      try {
         x.addEventListener("change", (e) => check(e))
      } catch (e) {
         try { x.addListener(check) }
         catch (e2) {
            console.log(e2);
         }
      }
   }, [])
   useEffect(() => {
      // window.addEventListener('resize', () => { }
   })
   return (
      <Flickity {...flickOpt} centerSlidePercentage={percent} currentSlide={currentSlide}>
         <SliderItem></SliderItem>
         {children}
         <SliderItem></SliderItem>
      </Flickity>);
}
const SliderItem = function ({ onclick, children }) {
   const bg = useMemo(() => [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)]);
   // console.log(bg);
   return (<div onClick={onclick} className="sIitem" style={{
      // backgroundColor: `rgb(${bg[0]},${bg[1]},${bg[2]})`,
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
   }}>{
         children
      }</div>);
}
export { SliderItem };
export default Slider;