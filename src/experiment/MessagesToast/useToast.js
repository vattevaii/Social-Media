import { useContext } from "react";
// Any context with an error : Error Array
// Must have SET_ERROR and REMOVE_ERROR actions
function useToast(context) {
   const { dispatch } = useContext(context);
   function setMessage(message) {
      if (message === undefined) return;
      // console.log(message.data)
      if (message.statusText === "OK") {
         console.log(message)
         dispatch({ type: "SET_ERROR", payload: { type: "success", title: "Task Completed", message: "", persists: false } });
         return;
      }
      if (message.statusText === "Unauthorized") {
         dispatch({ type: "SET_ERROR", payload: { type: "error", title: message.statusText, message: "You cannot view this page", persists: false } });
         return;
      }
      dispatch({ type: "SET_ERROR", payload: { type: "error", title: "Task Failed", message: message.statusText + message.data, persists: true } });
   }

   return setMessage;
}

export default useToast;