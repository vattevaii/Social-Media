import Flickity from 'react-flickity-component';
import "flickity/css/flickity.css";
import { useEffect } from 'react';
import "./Slider3.css"
function Slider({ children }) {
   const flickOpt = {
      cellAlign: 'left',
      contain: true,
      wrapAround: true,
      autoPlay: false,
      prevNextButtons: true,
      pageDots: false,
      draggable: true,
   };
   return (<Flickity className="slider" options={flickOpt}>
      {children}
   </Flickity>);
}
Slider.Item = function (props) {
   const bg = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
   console.log(bg);
   return (<div className="slide--item" style={{
      backgroundColor: `rgb(${bg[0]},${bg[1]},${bg[2]})`,
      height: "400px",
      width: "600px",
   }}></div>);
}

export default Slider;