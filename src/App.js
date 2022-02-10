import React, { useContext, useEffect } from 'react';
import './App.css';
import { useCookies } from "react-cookie"
import { AuthContext } from "./context/auth.context";
import apiClient from "./http-common"
import { useMutation } from "react-query";
import RouteingLogic from './Router';
import MessageToast from './experiment/MessagesToast/Toast';
import useActions from './context/useActions';

function App() {
  const { dispatch, accessToken, user } = useContext(AuthContext);
  const [cookies] = useCookies()
  const { foundError } = useActions();
  // const { foundError } = useActions(AuthContext);
  const tryPosts = useMutation("tryPosts", () => {
    apiClient.get("/posts/timeline", { params: { email: user.email } })
      .then((data) => { console.log(data); })
      .catch((err) => { foundError(err) });
  });
  // const navigate = useNavigate();
  useEffect(() => {
    if (!!accessToken) {
      tryPosts.mutate();
      return;
    } const { jwt, user, refresh } = cookies;
    if (!!jwt) {
      dispatch({ type: "ACCESS_TOKEN", payload: cookies });
      console.log("access token is set")
      return;
    }
    if (!refresh || !user) return
    console.log("Try getting data");
  }, [dispatch, accessToken])
  return (<>
    <MessageToast context={AuthContext} />
    <RouteingLogic />
  </>
  );
}

export default App;
