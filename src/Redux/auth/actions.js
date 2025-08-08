// import { toast } from "react-toastify";
// import {
//   loginWithEmail,
//   registerWithEmail,
//   loginWithGoogle,
//   logoutUser,
// } from "../../Services/authService";
// // } from "../../Services/authServices";

// export const LOGIN_REQUEST = "LOGIN_REQUEST";
// export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
// export const LOGIN_FAILURE = "LOGIN_FAILURE";
// export const LOGOUT = "LOGOUT";
// export const REGISTER_REQUEST = "REGISTER_REQUEST";
// export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
// export const REGISTER_FAILURE = "REGISTER_FAILURE";

// export const login = (email, password) => async (dispatch) => {
//   dispatch({ type: LOGIN_REQUEST });
//   try {
//     const user = await loginWithEmail(email, password);
//     dispatch({ type: LOGIN_SUCCESS, payload: user });
//     toast.success("Logged in successfully!");
//     return user;
//   } catch (error) {
//     dispatch({ type: LOGIN_FAILURE, payload: error.message });
//     toast.error(error.message);
//     throw error;
//   }
// };

// export const register = (email, password) => async (dispatch) => {
//   dispatch({ type: REGISTER_REQUEST });
//   try {
//     const user = await registerWithEmail(email, password);
//     dispatch({ type: REGISTER_SUCCESS, payload: user });
//     toast.success("Registration successful!");
//     return user;
//   } catch (error) {
//     dispatch({ type: REGISTER_FAILURE, payload: error.message });
//     toast.error(error.message);
//     throw error;
//   }
// };

// export const googleSignIn = () => async (dispatch) => {
//   dispatch({ type: LOGIN_REQUEST });
//   try {
//     const user = await loginWithGoogle();
//     dispatch({ type: LOGIN_SUCCESS, payload: user });
//     toast.success("Logged in with Google successfully!");
//     return user;
//   } catch (error) {
//     dispatch({ type: LOGIN_FAILURE, payload: error.message });
//     toast.error(error.message);
//     throw error;
//   }
// };

// export const logout = () => async (dispatch) => {
//   try {
//     await logoutUser();
//     dispatch({ type: LOGOUT });
//     toast.success("Logged out successfully!");
//   } catch (error) {
//     toast.error(error.message);
//     throw error;
//   }
// };


import { toast } from "react-toastify";
import {
  loginWithEmail,
  registerWithEmail,
  loginWithGoogle,
  logoutUser,
} from "../../Services/authService";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const user = await loginWithEmail(email, password);
    dispatch({ type: LOGIN_SUCCESS, payload: user });
    toast.success("Logged in successfully!");
    return user;
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
    toast.error(error.message);
    throw error;
  }
};

export const register = (email, password) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const user = await registerWithEmail(email, password);
    dispatch({ type: REGISTER_SUCCESS, payload: user });
    toast.success("Registration successful!");
    return user;
  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: error.message });
    toast.error(error.message);
    throw error;
  }
};

export const googleSignIn = () => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const user = await loginWithGoogle();
    dispatch({ type: LOGIN_SUCCESS, payload: user });
    toast.success("Logged in with Google successfully!");
    return user;
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
    toast.error(error.message);
    throw error;
  }
};

export const logout = () => async (dispatch) => {
  try {
    await logoutUser();
    dispatch({ type: LOGOUT });
    toast.success("Logged out successfully!");
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
};
