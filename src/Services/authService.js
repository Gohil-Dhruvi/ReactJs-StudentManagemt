// import { auth, googleProvider } from "../Config/firebaseConfig";
// import {
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
// } from "firebase/auth";

// export const loginWithEmail = async (email, password) => {
//   try {
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     return userCredential.user;
//   } catch (error) {
//     console.error("Error during login with email:", error);
//     throw error;
//   }
// };

// export const registerWithEmail = async (email, password) => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     return userCredential.user;
//   } catch (error) {
//     console.error("Error during registration:", error);
//     throw error;
//   }
// };

// export const loginWithGoogle = async () => {
//   try {
//     const result = await signInWithPopup(auth, googleProvider);
//     return result.user;
//   } catch (error) {
//     console.error("Error during Google login:", error);
//     throw error;
//   }
// };

// export const logoutUser = async () => {
//   try {
//     await signOut(auth);
//   } catch (error) {
//     console.error("Error during logout:", error);
//     throw error;
//   }
// };

// export const getCurrentUser = () => {
//   return auth.currentUser;
// };


import { auth, googleProvider } from "../Config/firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";

/**
 * Logs in a user with email and password
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<Object>} - User credentials
 * @throws {Error} - With proper error message for different cases
 */
export const loginWithEmail = async (email, password) => {
  try {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    if (!userCredential?.user) {
      throw new Error("No user found after sign in");
    }

    return userCredential.user;
  } catch (error) {
    let errorMessage = "Login failed";
    
    switch (error.code) {
      case "auth/invalid-email":
        errorMessage = "Invalid email address";
        break;
      case "auth/user-disabled":
        errorMessage = "This account has been disabled";
        break;
      case "auth/user-not-found":
        errorMessage = "No account found with this email";
        break;
      case "auth/wrong-password":
        errorMessage = "Incorrect password";
        break;
      case "auth/too-many-requests":
        errorMessage = "Too many attempts. Account temporarily locked";
        break;
      default:
        errorMessage = error.message || errorMessage;
    }

    throw new Error(errorMessage);
  }
};

/**
 * Registers a new user with email and password
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @param {string} displayName - User's display name
 * @returns {Promise<Object>} - User credentials
 * @throws {Error} - With proper error message for different cases
 */
export const registerWithEmail = async (email, password, displayName) => {
  try {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    if (!userCredential?.user) {
      throw new Error("No user found after registration");
    }

    // Update user profile with display name
    if (displayName) {
      await updateProfile(userCredential.user, { displayName });
    }

    return userCredential.user;
  } catch (error) {
    let errorMessage = "Registration failed";
    
    switch (error.code) {
      case "auth/email-already-in-use":
        errorMessage = "Email already in use";
        break;
      case "auth/invalid-email":
        errorMessage = "Invalid email address";
        break;
      case "auth/operation-not-allowed":
        errorMessage = "Email/password accounts are not enabled";
        break;
      case "auth/weak-password":
        errorMessage = "Password is too weak";
        break;
      default:
        errorMessage = error.message || errorMessage;
    }

    throw new Error(errorMessage);
  }
};

/**
 * Logs in a user with Google authentication
 * @returns {Promise<Object>} - User credentials
 * @throws {Error} - With proper error message
 */
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    
    if (!result?.user) {
      throw new Error("No user found after Google sign in");
    }

    return result.user;
  } catch (error) {
    let errorMessage = "Google sign in failed";
    
    switch (error.code) {
      case "auth/account-exists-with-different-credential":
        errorMessage = "Account already exists with different credential";
        break;
      case "auth/popup-closed-by-user":
        errorMessage = "Sign in popup was closed";
        break;
      case "auth/cancelled-popup-request":
        errorMessage = "Sign in cancelled";
        break;
      default:
        errorMessage = error.message || errorMessage;
    }

    throw new Error(errorMessage);
  }
};

/**
 * Logs out the current user
 * @throws {Error} - If logout fails
 */
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error("Logout failed: " + (error.message || "Unknown error"));
  }
};

/**
 * Sends a password reset email
 * @param {string} email - User's email
 * @throws {Error} - If sending fails
 */
export const sendPasswordReset = async (email) => {
  try {
    if (!email) {
      throw new Error("Email is required");
    }

    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    let errorMessage = "Password reset failed";
    
    switch (error.code) {
      case "auth/invalid-email":
        errorMessage = "Invalid email address";
        break;
      case "auth/user-not-found":
        errorMessage = "No user found with this email";
        break;
      default:
        errorMessage = error.message || errorMessage;
    }

    throw new Error(errorMessage);
  }
};

/**
 * Gets the current authenticated user
 * @returns {Object|null} - Current user or null if not authenticated
 */
export const getCurrentUser = () => {
  try {
    return auth.currentUser;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};