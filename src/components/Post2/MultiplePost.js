import React, { useContext, useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
// import "./PostWrapper2.css";
import apiClient from "../../http-common";
import Slider from "../../experiment/Slider/Slider4";
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

function MultiplePost () {
   const { foundError } = useActions(AuthContext);
   const navigate = useNavigate();
   const { user } = useContext(AuthContext);
   const { username } = useParams();
   const [activePage, changePage] = useState(1);
   const [stateofSlider, reloadSlider] = useState(true)
   const showPosts = [1, 2, 3];
   const postIdsFromNet = [1, 2, 3];
   const [error, setError] = useState(false);

   const [weHaveData, setDataCome] = useState(null);
   const removePost = (id) => {
      getPostsAgain();
   }
   const reactPost = (userId, postId) => {
      getPostsAgain();
   }
   const { isFetching: loading, refetch: getPostsAgain } = useQuery("getPosts", () => {
      return apiClient.get("/posts/timeline", { params: { email: "pawan@gmail.com" } })
         .then((res) => {
            console.log("get user");
            getUser(res.data[0])
            setDataCome(res.data)
         }).catch((err) => { foundError(err); setError(true) });
   }, {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnNetworkStatusChange: false,
      retry: false,
   });
   const [user2, setUser] = useState(null);
   const { isFetching: loading2, mutate: getUser } = useMutation("getUser", ({ userId }) => {
      return apiClient.get(`/users/profile?userId=${userId}`)
   },
      {
         onSuccess: (res) => { setUser(res.data); },
         onError: (err) => { foundError(err) },
      });

   const leftOrRight = (e) => {
      if (e.keyCode === 37) changePage((i) => i > 0 ? i - 1 : i) //left
      if (e.keyCode === 39) changePage((i) => i < showPosts.length - 1 ? i + 1 : i) //right
   }
   const changePageTo = (i, p) => {
      if (i < 1 || i > weHaveData.length) {
         reloadSlider((s) => !s);
         return;
      };
      changePage(() => i);
   }

   const downloadImage = () => {
      apiClient.get("/images/download/" + weHaveData[0].image);
   }
   const detailsRef = useRef();
   const toggleDetailsView = (e) => {
      detailsRef.current.classList.toggle("show");
   }
   useEffect(() => {
      // console.log(`${stateofSlider} + ${activePage}`);
   }, [stateofSlider, activePage]);
   useEffect(() => {
      // console.log(loading);
      // console.log(weHaveData)
   }, [weHaveData]);
   if (!weHaveData) //Data Xaina
      return (
         <FullPage>
            {!error ? //Loading State
               <Loader /> :
               <Error>No Posts for the user</Error>}
         </FullPage>
      )
   else return (<FullPage keyHandler={leftOrRight}>
      <div style={{ maxWidth: "700px", margin: "auto", position: "relative", zIndex: "2" }}
         onDoubleClick={toggleDetailsView}>
         <Person className={"glassModel dark"} person={user2 ? user2 : { username: "Loading..." }} />
         <div ref={detailsRef} className="postDetail show">
            <PostDetails data={weHaveData[activePage - 1]} detailToggle={toggleDetailsView}
               deletePost={(id) => removePost(id)} reactToPost={reactPost} />
         </div>
      </div><Slider selectedItem={activePage} changePos={changePageTo} >
         {
            weHaveData.map((d, index) =>
               <PostImage key={index} url={d.image} desc={d.desc} onClick={toggleDetailsView} />
            )
         }
         {/* <SlideItem link>
               <Post.MoreData></Post.MoreData>
            </SlideItem> */}
      </Slider>
   </FullPage >);
}

export default MultiplePost;