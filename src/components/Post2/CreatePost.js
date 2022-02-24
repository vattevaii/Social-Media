import FullPage from "../../assets/DisplayFullPage";
import { useContext, useEffect, useRef, useState } from "react";
import img from "../../assets/logos/facebook.svg"
import httpCommon from "../../http-common";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";
import { useMutation } from "react-query";
import useActions from "../../context/useActions";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
// import { useLocation } from "react-router-dom";

function CreatePost ({ title }) {
   const navigateTo = useNavigate();
   const { id } = useParams();
   const { foundError } = useActions(AuthContext);
   const [image, setImage] = useState(img);
   const getPost = useMutation("getPost", () => {
      httpCommon.get(`/posts/${id}`, { params: { id: id } })
         .then((res) => {
            editPost(res.data); setDesc(res.data.desc);
            setImage(`/api/images/download/${res.data.image}`);
         })
         .catch((err) => { foundError(err) });
   });
   useEffect(() => {
      console.log(id);
      if (id) getPost.mutate();
   }, [])
   const [cookies] = useCookies(['user']);
   // console.log(user)
   // const [title, setTitle] = useState('');
   const [desc, setDesc] = useState('');
   const [selFile, setFile] = useState({ file: null })
   const [file, setFileup] = useState('');

   const uploadSingleFile = (e) => {
      setFile({
         file: URL.createObjectURL(e.target.files[0])
      })
      setFileup(e.target.files[0])
   }
   const imgPreview = selFile.file !== null ? <img src={selFile.file} alt='' /> : <img src={image} alt='' />;

   const [newPost, editPost] = useState({
      userId: cookies.user._id,
      desc: "",
      image: "",
      imageId: "",
      filename: "",
   });
   const postSubmit = async (e) => {
      // console.log(user)
      e.preventDefault();
      let news = newPost;
      news.desc = desc;
      editPost((prev) => news);
      console.log(news);
      if (file) {
         let imageId = (Math.random() + 1).toString(36).substring(2);
         let data = new FormData();
         const filename = Date.now() + file.name;
         data.append("name", filename);
         data.append("file", file);
         editPost((prev) => ({ ...prev, image: filename }));
         editPost((prev) => ({ ...prev, imageId: imageId }));
         try {
            var savedImage = await axios.post(
               `/api/upload?username=${cookies.user._id}&type=post&postId=${imageId}`,
               data
            );
         } catch (error) {
            console.log(error);
         }

         try {
            editPost((prev) => ({ ...prev, filename: savedImage.data.file.filename }));
            newPost.image = savedImage.data.file.filename;
            if (!id) await axios.post("/api/posts", newPost);
            else await axios.put(`/api/posts/${newPost._id}`,
               {
                  userId: cookies.user._id,
                  postId: newPost._id,
                  desc: newPost.desc, image: newPost.image
               }
            );
            navigateTo('/post2')
         } catch (error) {
            console.log(error);
            foundError(error);
         }
      }
      else {
         try {
            if (!id) await axios.post("/api/posts", newPost);
            else await axios.put(`/api/posts/${newPost._id}`,
               {
                  userId: cookies.user._id,
                  postId: newPost._id,
                  desc: newPost.desc, image: newPost.image
               });
            navigateTo('/post2')

         }
         catch (error) {
            console.log(error);
            foundError(error);
         }
         // window.location.reload();
      }
   }
   console.log(title)
   return (<FullPage>
      <form id="createPost" className="normform glassModel form" onSubmit={postSubmit} encType="multipart/form-data">
         <h2>{title}</h2>
         <div className="image">
            Image
            <div className="form-group preview">
               {imgPreview}
            </div>

            <div className="form-group">
               <input type="file" name="file" className="form-control" onChange={uploadSingleFile} />
            </div>
         </div>
         <div className="form-group">
            <textarea
               type="text"
               id="description"
               name="desc"
               aria-describedby="post_description"
               placeholder="Caption Here.."
               value={desc}
               onChange={(e) => setDesc(e.target.value)}
            />
         </div>
         <button type="submit" className="btn btn-primary">
            Submit
         </button>
      </form>
   </FullPage>
   )
}

export default CreatePost;