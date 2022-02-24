import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
// import "./PostWrapper2.css";
import apiClient from "../../http-common";
import Slider, { SliderItem as SlideItem } from "../../experiment/Slider/Slider4";
import Error from "../../experiment/LoadError/Error";
import Loader from "../../experiment/LoadError/Loader";
import FullPage from "../../assets/DisplayFullPage";
// import Post from "./Post";
import { Logo as Person } from '../Person/PersonMini';
import useActions from "../../context/useActions";
import { AuthContext } from "../../context/auth.context";
import "./Post.css"
import PostImage from "./PostImage";
import PostDetails from "./PostDetails";

function SinglePost() {
   const { foundError } = useActions(AuthContext);
   const navigate = useNavigate();
   const { postId } = useParams();

   const [weHaveData, setDataCome] = useState(null);
   const { isFetching: loading, error, mutate: tryPosts } = useMutation("tryPosts", () => {
      apiClient.get(`/posts/${postId}`, { params: { id: postId } })
         .then((res) => { setDataCome(res.data); })
         .catch((err) => { foundError(err) });
   });

   useEffect(() => {
      tryPosts();
   }, [])
   useEffect(() => {
      console.log(loading);
      console.log(weHaveData)
   }, [weHaveData]);
   if (!weHaveData) //Data Xaina
      return (
         <FullPage>
            {loading ? //Loading State
               <Loader /> :
               <Error />}
         </FullPage>
      )
   else return (<FullPage>
      <PostImage key={index} url={weHaveData.image} desc={weHaveData.desc} />
      <PostDetails data={weHaveData} />
   </FullPage >);
}

export default SinglePost;