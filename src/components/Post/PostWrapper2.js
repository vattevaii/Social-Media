import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FullPage from "@assets/DisplayFullPage";
import Slider, { SlideItem } from "@experiment/Slider/Slider2";
import Post from "./Post";
import { Logo as Person } from '../Person/PersonMini';
import './PostWrapper2.css'
import Loader from "@experiment/LoadError/Loader";
import Error from "@experiment/LoadError/Error";
// import { AuthContext } from "@context/auth.context";


function PostWrapper() {
   const { username } = useParams();
   const [activePage, changePage] = useState(1);
   const [loading, setLoading] = useState(true);
   const [weHaveData, dataCome] = useState(false);
   const [showPosts, addShowPosts] = useState([])
   const [postIdsFromNet, setPosts] = useState([])
   const [addingMoreData, setAdding] = useState(false)
   const [addDataError, setAddingError] = useState(false);
   const [dataAdded, dataChanged] = useState(false);
   const addMoreData = () => {
      // load more posts
      setAdding(true);
      setAddingError(true);
      const newData = [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)]
      setPosts((postIdsFromNet) => [...postIdsFromNet, ...newData])
      addShowPosts((showPosts) => [...showPosts, ...newData])
      // changePage((activePage) => activePage - 1)
      setTimeout(() => setAdding(false), 1000)
      dataChanged((dataAdded) => !dataAdded);
      // console.log(data)
   }
   const changeActive = (id) => {
      // if (!showPosts.includes(id)) addShowPosts((showPosts) => [...showPosts, id])
      console.log(showPosts.indexOf(id))
      changePage((activePage) => showPosts.indexOf(id) + 1);
      dataChanged((dataAdded) => !dataAdded);
   }
   const ObserveForScale = new IntersectionObserver(entries => {
      entries.forEach(entry => { entry.isIntersecting ? entry.target.classList.add('active') : entry.target.classList.remove('active') }
      )
   }, {
      threshold: 0.6
   });
   useEffect(() => {
      console.log(username);
      addMoreData();
      setTimeout(() => {
         // Either dataComes or Error occurs (only loading state change to false)
         dataCome(true)
      }, 2000)
      // Get all Post id's and all we thumbnails
      return _ => {
         ObserveForScale.disconnect();
      }
   }, [])
   const navigate = useNavigate()
   const leftOrRight = (e) => {
      if (e.keyCode === 37) tryGoingLeft() //left
      if (e.keyCode === 39) tryGoingRight() //right
   }
   const tryGoingLeft = () => {
      return
   }
   const tryGoingRight = () => {
      return
   }

   if (!weHaveData) //Data Xaina
      return (
         <FullPage>
            {loading ? //Loading State
               <Loader /> :
               <Error />}
         </FullPage>
      )
   else // Data Aayo
      return (<FullPage keyHandler={leftOrRight}>
         <a onClick={() => navigate(-1)} className="hover-white navigate-back">
            Go Back
         </a>
         <Slider initPos={activePage} changePos={changePage} dataAdded={dataAdded} >
            {
               showPosts.map((d, index) => <SlideItem key={index}>
                  <Post id={d} entryObserver={ObserveForScale} active={index === activePage - 1 ? true : false}></Post>
               </SlideItem>)
            }
            <SlideItem link onclick={addMoreData}>
               <Post.MoreData error={addDataError} loading={addingMoreData}></Post.MoreData>
            </SlideItem>
         </Slider>
         <Slider initPos={activePage} changePos={changePage} nobutton>
            {
               postIdsFromNet.map((id, index) => <SlideItem
                  className={index === activePage - 1 ? "activeSlide" : ""}
                  link key={index} onclick={() => changeActive(id)}>
                  <Person person={{ id: 1 }} className="hover-white" />
               </SlideItem>)
            }
         </Slider>
      </FullPage>);
}

export default PostWrapper;