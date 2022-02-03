import './Post.css'
import { ReactComponent as FbLogo } from '@assets/logos/facebook.svg'
import { ReactComponent as LinkLogo } from '@assets/logos/Link.svg'
import { ReactComponent as ShareLogo } from '@assets/logos/share.svg'
import { ReactComponent as Dots3 } from '@assets/logos/3dots.svg'
import React, { useEffect, useRef, useState } from 'react'
import Loader from '@experiment/LoadError/Loader'
import Error from '@experiment/LoadError/Error'
import LikeButton from '../Button/Like'
import Dropdown from '@experiment/StaticDropdown/DropDown'
function Post({ id, entryObserver, active }) {
   const postImg = "https://www.imgacademy.com/themes/custom/imgacademy/images/helpbox-contact.jpg"
   const postName = `${id} Image tag`
   const postDetail = "This is a random image extracted from internet."
   const postUser = "vattevaii"
   const [likeStatus, likeStatusChange] = useState(false)
   const [postComments, setPostComments] = useState([{ id: 1, user: "bhatte", comment: "sale..xito aaija firta" },
   { id: 2, user: "bhatte", comment: "ka xas aile" },
   { id: 4, user: "letdsa", comment: "aayo aayo" },])
   const allComments = [{ id: 1, user: "bhatte", comment: "sale..xito aaija firta" },
   { id: 2, user: "bhatte", comment: "ka xas aile" },
   { id: 3, user: "ste", comment: "dharan kaile aaune" },
   { id: 5, user: "adgfas", comment: "gg" },
   { id: 6, user: "dsfsadf", comment: "meow" },
   { id: 7, user: "ste", comment: "dharan kaile aaune" },
   { id: 8, user: "letdsa", comment: "aayo aayo" },
   { id: 9, user: "adgfas", comment: "gg" },
   { id: 10, user: "dsfsadf", comment: "meow" },
   { id: 21, user: "ste", comment: "dharan kaile aaune" },
   { id: 12, user: "letdsa", comment: "aayo aayo" },
   { id: 112, user: "adgfas", comment: "gg" },
   { id: 22, user: "dsfsadf", comment: "meow" },
   { id: 42, user: "ste", comment: "dharan kaile aaune" },
   { id: 72, user: "letdsa", comment: "aayo aayo" },
   { id: 52, user: "adgfas", comment: "gg" },
   { id: 200, user: "dsfsadf", comment: "meow" },]
   const loadData = () => {
      setTimeout(() => {
         setLoading(false);
         // DATA CUM or NOT CUM
         dataCome(true);
      }, 5000);
   }
   const [cmntText, setCmnt] = useState('');
   const commentSubmit = (e) => {
      if (e.keyCode !== 13) return;
      setPostComments((postComments) => [...postComments, { id: 100, user: 'khate', comment: cmntText }]);
      setCmnt('');
   }
   const [loading, setLoading] = useState(true);
   const [weHaveData, dataCome] = useState(false);
   const post = useRef();

   useEffect(() => {
      // entryObserver.observe(post.current);
      // Load Data and then change the loading state and weHaveData state
      setTimeout(() => {
         setLoading(false);
         dataCome(true);
      }, 1000)
      return _ => {
         // entryObserver.unobserve(post.current);
      }
   }, []);

   if (!weHaveData) //We dont have the DATA
      return (<div className={`post nopost glassModel`} ref={post}>
         {loading === true ? //LOADING STATE
            <><Loader /><button onClick={() => setLoading(false)}>A glimpse of Error</button></>
            : //ERROR STATE
            <Error></Error>}
      </div>)
   else //Have Data for Post Start
      return (
         <div className={`post ${!active ? '' : 'active'} glassModel`} ref={post}>
            <div className="cover"><img src={postImg} /></div>
            <Dropdown className={'options'}>
               <Dropdown.Visible><Dots3 /></Dropdown.Visible>
               <Dropdown.Focus className={'glassModel dark items'} left center>
                  <div className="fb hover-white"><FbLogo fill="#0000ff" />Share via <strong>FaceBook</strong></div>
                  <div className="lk hover-white"><LinkLogo fill="#0000ff" />Share via <strong>Link</strong></div>
               </Dropdown.Focus>
            </Dropdown>
            <div className="coverImg" title={postName}>
               <img src={postImg} alt={postName} />
               <LikeButton className="like-btn" like={likeStatus}
                  likeMe={() => likeStatusChange(!likeStatus)} />
            </div>
            <div className="postOptions dark glassModel">
               <div className="detail">
                  <strong>@{postUser}</strong> {postDetail}
               </div>
               <div className="commentWrap glassModel dark">
                  <div className="comments">
                     <h3>Comments</h3>
                     <ul>
                        {postComments.map(({ id, user, comment }) =>
                           <li key={id} className="hover-dark"><strong>@{user}</strong> {comment}</li>
                        )}
                     </ul>
                  </div>
                  <input type="text" name="comment" id="" placeholder='Type your comment here..'
                     value={cmntText} onChange={(e) => setCmnt(e.target.value)} onKeyUp={commentSubmit} />
               </div>
               <Dropdown className={'share'}>
                  <Dropdown.Visible><ShareLogo /></Dropdown.Visible>
                  <Dropdown.Focus className={'glassModel dark items'} left center>
                     <div className="fb hover-white"><FbLogo fill="#0000ff" />Share via <strong>FaceBook</strong></div>
                     <div className="lk hover-white"><LinkLogo fill="#0000ff" />Share via <strong>Link</strong></div>
                  </Dropdown.Focus>
               </Dropdown>
            </div>
         </div>);
}
Post.MoreData = function MoreData({ loading, error }) {
   if (loading) return (
      <div className={`post nopost`}>
         <Loader />
      </div>)
   if (error) return (
      <div className={`post nopost`}>
         <Error>Click to retry..</Error>
      </div>)
   return (<div className="post nopost hover-white">
      Give Me More Data bitches!!
   </div>)
}

export default Post;