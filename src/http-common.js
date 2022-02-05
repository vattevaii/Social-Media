import axios from "axios";

export default axios.create({
   // baseURL: "http://192.168.1.65:5000/api",
   // baseURL: "http://localhost:5000/api",
   baseURL: "https://social-media245.herokuapp.com/api",
   headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:5000",
   },
   withCredentials: true
});
