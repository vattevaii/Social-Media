const AuthReducer = (state, action) => {
   switch (action.type) {
      case "LOGIN_START":
         return {
            ...state,
            user: null,
            accessToken: "",
            refreshToken: "",
         };

      case "LOGIN_SUCCESS":
         return {
            ...state,
            user: action.payload.user,
            accessToken: action.payload.accessToken,
            refreshToken: action.payload.refreshToken,
         };

      case "LOGIN_FAILURE":
         return {
            ...state,
            error: [...state.error, action.payload],
         };

      case "ACCESS_TOKEN":
         return {
            ...state,
            user: action.payload.user,
            accessToken: action.payload.jwt,
            refreshToken: action.payload.refresh,
         };

      case "LOGOUT": {
         return {
            ...state,
            user: null,
            accessToken: "",
            refreshToken: "",
            isFetching: false,
         };
      }

      case "REFRESH_SUCCESS":
         return {
            ...state,
            accessToken: action.payload.accessToken,
            refreshToken: action.payload.refreshToken,
         };

      case "REFRESH_FAILURE":
         return {
            accessToken: "",
            refreshToken: "",
            user: null,
            isFetching: false,
            error: [...state.error, action.payload],
         };

      case "SET_ERROR":
         return {
            ...state,
            error: [...state.error, action.payload],
         };

      case "REMOVE_ERROR":
         return {
            ...state,
            error: [...state.error.filter((e, i) => i !== action.payload)],
         };

      default:
         return state;
   }
};

export default AuthReducer;