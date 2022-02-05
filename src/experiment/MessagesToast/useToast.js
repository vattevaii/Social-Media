import { useContext } from "react";
// Any context with an error : Error Array
// Must have SET_ERROR and REMOVE_ERROR actions
function useToast(context) {
   const { dispatch } = useContext(context);
   function setMessage(message, text = null, msg = null, persist = false) {
      if (message === undefined) return;
      if (message.statusText === "OK") {
         dispatch({ type: "SET_ERROR", payload: { type: "success", title: text ? text : "Task Completed", message: msg ? msg : "", persists: persist } });
         return;
      }
      if (message.statusText === "Unauthorized") {
         dispatch({ type: "SET_ERROR", payload: { type: "error", title: message.statusText, message: "You cannot view this page", persists: persist } });
         return;
      }
      dispatch({ type: "SET_ERROR", payload: { type: "error", title: "Task Failed", message: message.statusText + message.data, persists: true } });
   }

   return setMessage;
}

export default useToast;