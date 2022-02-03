import logo from '../logo.svg';
import { Logo as Person } from './Person/PersonMini';
import Post from './Post/Post';
import "./Default.css"
import apiClient from "../http-common"
import { useMutation } from "react-query"
import { AuthContext } from "../context/auth.context";
import { Link, useNavigate } from 'react-router-dom';
import useActions from '../context/useActions';

function Default() {
   const people = [{
      id: 1, name: "Tayhun"
   }, {
      id: 2, name: "Ashishsssssss"
   }, {
      id: 4, name: "Pawan"
   }];
   const { loginSuccess, foundError } = useActions(AuthContext);

   const { mutate: logIn } = useMutation("logIn",
      async () => await apiClient.post("/auth/login",
         { email: "pawan@gmail.com", password: "pawanss" }),
      {
         onSuccess: (res) => {
            try { loginSuccess(res); }
            catch (e) { console.log(e) }
         },
         onError: (err) => foundError(err)
      }
   );
   const navigate = useNavigate();
   return (<>
      <section className="posts">
         <Link to="/post">Post</Link>
         <h3>Posts</h3>
         <div className="people">
            {people.map(person =>
               <Person person={person} key={person.id}
                  className="nostretch hover-white"
                  clickHandler={() => navigate(`/post`)} />
            )}
         </div>
      </section>
      <section className="testingtesting">
         <button onClick={logIn}>Log Me In</button>
         <button onClick={() => navigate("/login")}>Go to the Login Page(Prevented - exp)</button>
         <button onClick={() => navigate("/post")}>Got to the Post Page(Protected - post)</button>
      </section>
   </>);
}

export default Default;