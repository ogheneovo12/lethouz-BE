import React, { useEffect } from "react";
import { userReducer } from "../reducers";
import {
  loginUser,
  signOut,
  register,
  checkUserLoginStatus,
  clearError,
  clearFeedBack,
  changeUserPassword, 
  findUserApartment,
  findUser
} from "../actions";
import { checkedJsonStorage } from "../utils/";
var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!checkedJsonStorage("user"),
    isLoading: false,
    error: "",
    feedback: "",
    user: checkedJsonStorage("user"),
  });

  useEffect(() => {
    checkUserLoginStatus(dispatch, state.isAuthenticated);
    //eslint-disable-next-line
  }, []);
  function autoCheckStatus() {
    checkUserLoginStatus(dispatch, state.isAuthenticated);
  }
  return (
    <UserStateContext.Provider value={{ ...state, autoCheckStatus }}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export {
  UserProvider,
  useUserState,
  useUserDispatch,
  loginUser,
  signOut,
  register,
  checkUserLoginStatus,
  clearError,
  clearFeedBack,
  changeUserPassword,
  findUserApartment,
  findUser
};

// ###########################################################
