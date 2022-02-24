import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../context/auth.context";
import './Toast.css'

const Toast = ({ context, title, message, type, persist, index }) => {
   const { dispatch } = useContext(context);
   const [id, setId] = useState(0);
   const closeToast = () => dispatch({ type: "REMOVE_ERROR", payload: id });

   useEffect(() => {
      // console.log(Date.now());
      if (!!persist) return;
      // console.log(Date.now());
      setTimeout(() => {
         dispatch({ type: "REMOVE_ERROR", payload: id });
         // console.log(Date.now());
      }, 5000);
   }, [type, dispatch, id, persist])
   useEffect(() => {
      setId(index);
   }, [index])
   const element = message.split('pre');
   // console.log(element);
   return (
      <div className={`toast glassModel ${type}`}>
         {persist && <span className="close" onClick={closeToast}>x</span>}
         <div className="title">{message.length < 100 ? title : element[0].split('<')[0]}</div>
         {!!message ? <div className="message">{message.length < 100 ? message : element[1]}</div> : ""}
      </div>)
}

function MessageToast ({ context }) {
   const { error } = useContext(context);
   // const [errorlength, setErrorLength] = useState(0);
   useEffect(() => {
      // console.log(error)
      // if (error.length > 0) {
      //    console.log(error);
      // }
   }, [error.length, error])
   if (!!error.length)
      return (<div className="toastHolder">
         {
            error.map((e, i) => (
               <Toast context={context}
                  key={i}
                  title={e.title + i}
                  message={e.message} type={e.type}
                  persist={e.persists} index={i} />
            ))
         }
      </div>);

   return (<></>)
}

export default MessageToast;