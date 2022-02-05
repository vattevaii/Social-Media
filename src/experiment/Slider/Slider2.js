import { ReactComponent as ShareLogo } from '@assets/logos/share.svg'
import './Slider2.css'
import { useEffect, useRef } from 'react';
// import * as Hammer from 'hammerjs'

function debounce(fn, ms) {
   let timer
   return _ => {
      clearTimeout(timer)
      timer = setTimeout(_ => {
         timer = null
         fn.apply(this, arguments)
      }, ms)
   };
}

function SlideItem({ link, children, onclick, className }) {
   const sItem = useRef()
   // useEffect(() => setTimeout(() => sItem.current.classList.toggle("mini"), 200), [])
   return (link === true ?
      <div ref={sItem} className={`slide--item ${className} hover-white`} onClick={onclick}>
         {children}
      </div>
      :
      <div ref={sItem} className={`slide--item`}>
         {children}
      </div>);
}

function Slider({ children, initPos, changePos, nobutton }) {
   // Every element inside must have their own scrollSnapAlign property
   // const [initPos, changePos] = useState(1);
   const swipe = (ref, final) => {
      const childWidth = ref.children[0].offsetWidth;
      // const present = ref.scrollLeft;
      const padding = parseInt(ref.style.paddingLeft, 10)
      // console.log(padding)
      const finalPos = (final - 1) * childWidth + padding / 2;
      // let scrollAmount = finalPos - present;
      // console.log(scrollAmount + "   " + final + "   init:" + initPos)
      ref.scrollTo({
         left: finalPos,
         behavior: 'smooth'
      })
   }
   const handleResize = debounce(function handleResize() {
      let padding = 0;
      let pad = 0;
      if (window.innerWidth > 600) {
         pad = 0.5 * (slideItems.current.offsetWidth - slideItems.current.children[0].offsetWidth)
         padding = `0 ${pad}px 0 ${pad}px`
      }
      if (slideItems.current.children[0].offsetWidth - 0.5 * slideItems.current.offsetWidth < 0)
         slideItems.current.style.overflowX = "auto"
      slideItems.current.style.padding = padding
      slideItems.current.style.scrollPaddingLeft = `${pad}px`
      slideItems.current.style.scrollPaddingRight = `${pad}px`
      // console.log(padding)
   }, 1000);
   const tryGoingLeft = () => {
      // console.log("I went Left" + initPos);
      // if (initPos <= 1) return;
      changePos((initPos) => --initPos)
   };
   const tryGoingRight = () => {
      // console.log("I went Right " + initPos);
      // if (initPos >= slideItems.current.children.length) return;
      changePos((initPos) => ++initPos)
   }
   // const items = [1, 2, 3, 4, 5]
   const slider = useRef();
   const slideItems = useRef();
   useEffect(() => {
      if (initPos < 1) changePos(1);
      if (initPos > slideItems.current.children.length + 1) changePos(slideItems.current.children.length + 1)
      swipe(slideItems.current, initPos);
      // if (nobutton) return;
   }, [initPos, nobutton])
   useEffect(() => {
      handleResize();
      window.addEventListener('resize', handleResize)
      const items = slideItems.current;
      if (!nobutton) {
         slideItems.current.addEventListener('swiped-left', tryGoingRight);
         slideItems.current.addEventListener('swiped-right', tryGoingLeft);
      }
      return _ => {
         if (!nobutton) {
            items.removeEventListener('swiped-left', tryGoingRight);
            items.removeEventListener('swiped-right', tryGoingLeft);
         }
         window.removeEventListener('resize', handleResize)
      }
   }, []);
   return (<div className="slider" ref={slider}>
      {!nobutton ?
         <button className="btn navigator" onClick={tryGoingLeft}>
            <ShareLogo />
         </button> : ''}
      <div className={`slide--items ${nobutton === true ? "scroll" : ''}`} ref={slideItems}>
         {/* {items.map((item, index) => <SlideItem key={index} data={item} />)} */}
         {children}
      </div>
      {!nobutton ? <button className="btn navigator" onClick={tryGoingRight}>
         <ShareLogo />
      </button> : ''}
   </div>);
}

export { SlideItem };
export default Slider;