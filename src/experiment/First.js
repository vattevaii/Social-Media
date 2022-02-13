import Slider, { SliderItem } from "./Slider/Slider3";
import Dropdown from './StaticDropdown/DropDown'
import { ReactComponent as ShareLogo } from '@assets/logos/share.svg'
import { ReactComponent as FbLogo } from '@assets/logos/facebook.svg'
import { ReactComponent as LinkLogo } from '@assets/logos/Link.svg'

import './First.css'
import LikeButton from "../components/Button/Like";
import { useState } from "react";
const DpDn = () => (<Dropdown className={'share2'}>
   <Dropdown.Visible><ShareLogo /></Dropdown.Visible>
   <Dropdown.Focus className={'glassModel'} left center>
      <div className="fb hover-white"><FbLogo fill="#0000ff" />Share via <strong>FaceBook</strong></div>
      <div className="lk hover-white"><LinkLogo fill="#0000ff" />Share via <strong>Link</strong></div>
   </Dropdown.Focus>
   {/* <Dropdown.Focus className={'glassModel'} left center>
      <div className="fb">
         <FbLogo fill="#0000ff" />
      </div>
      <div className="lk">
         <LinkLogo fill="#0000ff" />
      </div>
   </Dropdown.Focus> */}
</Dropdown>)
function Experiment() {
   const [selected, sslt] = useState(0);
   const [like, changeLikeStatus] = useState(false);
   return (<>
      <a className="hover-white">Stack</a>
      <a className="hover-white">Slider</a>
      <a className="hover-white">Static Dropdown</a>
      <div className="griddpdn">
         <DpDn /><DpDn /><DpDn /><DpDn />
      </div>
      <LikeButton height="3em" width={"max-content"} like={like} likeMe={() => changeLikeStatus(!like)} />
      <Slider initPos={selected} changePos={sslt}>
         <SliderItem><div style={{ height: "200px", width: "100vw" }}></div></SliderItem>
         <SliderItem><div style={{ height: "200px", width: "100vw" }}></div></SliderItem>
         <SliderItem><div style={{ height: "200px", width: "100vw" }}></div></SliderItem>
         <SliderItem><div style={{ height: "200px", width: "100vw" }}></div></SliderItem>
         <SliderItem><div style={{ height: "200px", width: "100vw" }}></div></SliderItem>
         <SliderItem><div style={{ height: "200px", width: "100vw" }}></div></SliderItem>
         <SliderItem><div style={{ height: "200px", width: "100vw" }}></div></SliderItem>
      </Slider><br /><br />
      <button onClick={() => sslt(3)}>{selected}</button>
   </>);
}

export default Experiment;