
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function Slide ({ children, initPos, changePos, nobutton }) {
   var settings = {
      dots: true,
      accessibility: true,
      arrows: false,
      afterChange: changePos,
      infinite: false,
      centerMode: true,
      // centerPadding: "60px",
      draggable: true,
      initialSlide: initPos !== undefined ? initPos : 0,
      slidesToShow: 1.1,
      slidesToScroll: 1,
      responsive: [
         {
            breakpoint: 600,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 3,
               infinite: true,
               dots: true
            }
         }]
   };
   return (
      <Slider {...settings}>
         {children}
      </Slider>)
}