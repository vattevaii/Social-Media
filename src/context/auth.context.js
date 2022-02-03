import { createContext, useReducer } from "react";
import AuthReducer from "./auth.reducer";

const INITIAL_STATE = {
   user: null,
   error: [],
   refreshToken: "",
   accessToken: "",
};

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
   const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

   return (
      <AuthContext.Provider
         value={{
            user: state.user,
            error: state.error,
            accessToken: state.accessToken,
            refreshToken: state.refreshToken,
            dispatch,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};