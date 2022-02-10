import React, { useContext, useEffect } from 'react';
import './App.css';
import { useCookies } from "react-cookie"
import { AuthContext } from "./context/auth.context";
import RouteingLogic from './Router';
import MessageToast from './experiment/MessagesToast/Toast';

function App() {
  const { dispatch, accessToken, user } = useContext(AuthContext);
  const [cookies] = useCookies()
  // const navigate = useNavigate();
  useEffect(() => {
    if (!!accessToken) {
      // tryPosts.mutate();
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
