import React, { useContext, useEffect } from 'react';

import logo from './logo.svg';
import './App.css';
import { useCookies } from "react-cookie"
import { AuthContext } from "./context/auth.context";
import apiClient from "./http-common"
import { useMutation } from "react-query";
import RouteingLogic from './Router';
import MessageToast from './experiment/MessagesToast/Toast';
import { useNavigate } from 'react-router-dom';


function App() {
  const { dispatch, accessToken } = useContext(AuthContext);
  //Get the user from suseContextApi or whatever
  const [cookies, setCookies] = useCookies()
  const getRefreshToken = useMutation("refresh-page", () => {
    apiClient.get("/posts/timeline")
      .then((data) => { console.log(data); });
  });
  // const navigate = useNavigate();
  useEffect(() => {
    if (!!accessToken) return;
    console.log(accessToken)
    const { jwt, user, refresh } = cookies;
    if (!!jwt) {
      dispatch({ type: "ACCESS_TOKEN", payload: cookies });
      console.log("access token is set")
      return;
    }
    if (!refresh || !user) return
    getRefreshToken(refresh)
    //get jwt and user from the server and set it in

    // if(!!meta)
    // document.title = meta.title;
    // document.head.children.description.content = meta.description;
  }, [dispatch, accessToken])
  return (<>
    <MessageToast context={AuthContext} />
    <RouteingLogic />
  </>
  );
}

export default App;
