import Flickity from 'react-flickity-component';
import "flickity/css/flickity.css";
import React, { useEffect, useMemo, useRef, useState } from 'react';
import "./Slider3.css"

function Slider({ children, initPos, changePos, nobutton }) {
   const [fickty, setFickty] = useState(null)
   const flickOpt = {
      cellAlign: 'center',
      wrapAround: false,
      prevNextButtons: true,
      pageDots: true,
      initialIndex: initPos,
      percentPosition: false,
      prevNextButtons: !!nobutton ? false : true,
      friction: 0.5,
      // draggable: !!nobutton ? '>1' : false,
      freeScroll: !!nobutton ? true : false,
   };
   useEffect(() => {
      if (!fickty) return
      console.log(`current index is ${fickty.selectedIndex}`)
      fickty.on('change', (index) => changePos(index));
   }, [fickty])
   useEffect(() => {
      if (!fickty) return
      fickty.select(initPos)
   }, [initPos])
   return (
      <Flickity options={flickOpt} flickityRef={(c) => setFickty(c)}>
         {children}
      </Flickity>);
}
const SliderItem = function ({ onclick, children }) {
   const bg = useMemo(() => [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)]);
   // console.log(bg);
   return (<div onClick={onclick} className="slide--item" style={{
      backgroundColor: `rgb(${bg[0]},${bg[1]},${bg[2]})`,
      height: "fit-content",
      width: "fit-content",
   }}>{
         children
      }</div>);
}
export { SliderItem };
export default Slider;