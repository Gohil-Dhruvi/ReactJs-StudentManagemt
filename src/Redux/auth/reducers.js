// import {
//   LOGIN_REQUEST,
//   LOGIN_SUCCESS,
//   LOGIN_FAILURE,
//   LOGOUT,
//   REGISTER_REQUEST,
//   REGISTER_SUCCESS,
//   REGISTER_FAILURE,
// } from "./actions";
// // } from "../actions";

// const initialState = {
//   isAuthenticated: false,
//   user: null,
//   loading: false,
//   error: null,
// };

// const authReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case LOGIN_REQUEST:
//     case REGISTER_REQUEST:
//       return {
//         ...state,
//         loading: true,
//         error: null,
//       };
//     case LOGIN_SUCCESS:
//       return {
//         ...state,
//         isAuthenticated: true,
//         user: action.payload,
//         loading: false,
//         error: null,
//       };
//     case REGISTER_SUCCESS:
//       return {
//         ...state,
//         user: action.payload,
//         loading: false,
//         error: null,
//       };
//     case LOGIN_FAILURE:
//     case REGISTER_FAILURE:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//         isAuthenticated: false,
//         user: null,
//       };
//     case LOGOUT:
//       return {
//         ...state,
//         isAuthenticated: false,
//         user: null,
//       };
//     default:
//       return state;
//   }
// };

// export default authReducer;


import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "./actions";

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
        error: null,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
        user: null,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
