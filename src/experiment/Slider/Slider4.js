import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel as Flickity } from 'react-responsive-carousel'; import "flickity/css/flickity.css";
import React, { useEffect, useMemo, useState } from 'react';
import "./Slider3.css"

function Slider({ children, initPos, changePos, nobutton, small }) {
   const [flickOpt, addOpt] = useState({
      centerMode: true,
      onChange: changePos,
      onClickThumb: changePos,
      useKeyboardArrows: false,
      width: "100vw",
      showThumbs: false,
      centerSlidePercentage: 100,
      selectedItem: initPos !== undefined ? initPos : 1,
      showArrows: !!nobutton ? false : true,
      swipeable: true,
   });
   useEffect(() => {
      if (small) addOpt((options) => ({ ...flickOpt, centerSlidePercentage: 10 }));
   }, [])
   useEffect(() => {
      // window.addEventListener('resize', () => { }
   })
   return (
      <Flickity {...flickOpt}>
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
      height: "100%",
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