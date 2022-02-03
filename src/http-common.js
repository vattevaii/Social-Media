import axios from "axios";

export default axios.create({
   baseURL: "http://localhost:5000/api",
   headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:5000",
   },
   withCredentials: true
});
