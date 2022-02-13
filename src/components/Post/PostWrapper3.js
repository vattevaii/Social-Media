import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import "./PostWrapper2.css";
import apiClient from "../../http-common";
import Slider, { SliderItem as SlideItem } from "../../experiment/Slider/Slider4";
import Error from "../../experiment/LoadError/Error";
import Loader from "../../experiment/LoadError/Loader";
import FullPage from "../../assets/DisplayFullPage";
import Post from "./Post";
import { Logo as Person } from '../Person/PersonMini';
import useActions from "../../context/useActions";
import { AuthContext } from "../../context/auth.context";

function PostWrapper() {
   const { foundError } = useActions(AuthContext);
   const navigate = useNavigate();
   const { username } = useParams();
   const [activePage, changePage] = useState(1);
   const showPosts = [1, 2, 3];
   const postIdsFromNet = [1, 2, 3];

   const [weHaveData, setDataCome] = useState(null);
   const { isLoading: loading, error, mutate: tryPosts } = useMutation("tryPosts", () => {
      apiClient.get("/posts/timeline", { params: { email: "pawan@gmail.com" } })
         .then((data) => { setDataCome(data); })
         .catch((err) => { foundError(err) });
   });

   const leftOrRight = (e) => {
      if (e.keyCode === 37) changePage((i) => i > 0 ? i - 1 : i) //left
      if (e.keyCode === 39) changePage((i) => i < showPosts.length - 1 ? i + 1 : i) //right
   }
   useEffect(() => {
      tryPosts();
   }, [])
   useEffect(() => {
      console.log(loading);
      console.log(!weHaveData)
   }, [weHaveData]);
   if (!weHaveData) //Data Xaina
      return (
         <FullPage>
            {loading ? //Loading State
               <Loader /> :
               <Error />}
         </FullPage>
      )
   else return (<FullPage keyHandler={leftOrRight}>
      <a onClick={() => navigate(-1)} className="hover-white navigate-back">
         Go Back
      </a>
      <Slider initPos={1} changePos={changePage}>
         {
            showPosts.map((d, index) => <SlideItem key={index}>
               {< Post id={d}></Post>}
            </SlideItem>)
         }
         {//Add More data Code not written
         }
         <SlideItem link>
            <Post.MoreData></Post.MoreData>
         </SlideItem>
      </Slider>
      {/* <Slider initPos={activePage} changePos={changePage} nobutton small>
         {
            postIdsFromNet.map((id, index) => <SlideItem link
               key={index} onclick={() => changePage(id)}>
               <Person person={{ id: 1 }} className="hover-white" />
            </SlideItem>)
         }
      </Slider> */}
   </FullPage >);
}

export default PostWrapper;