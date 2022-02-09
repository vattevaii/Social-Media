import axios from "axios";
console.log(process.env.REACT_APP_BACKEND)
export default axios.create({
   // baseURL: "http://192.168.1.65:5000/api",
   // baseURL: "http://localhost:5000/api",
   baseURL: process.env.REACT_APP_BACKEND + "/api",
   headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": process.env.REACT_APP_BACKEND,
   },
   withCredentials: true
});
