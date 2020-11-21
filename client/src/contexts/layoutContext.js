import React from "react";
import { layoutReducer } from "../reducers";
import {
  handleMainMargin,
  toggleSidebar,
  disableSearch,
  enableSearch,
  toggleAuthModal,
  toggleNewsLetter,
} from "../actions";

var LayoutStateContext = React.createContext();
var LayoutDispatchContext = React.createContext();

function LayoutProvider({ children }) {
  var [state, dispatch] = React.useReducer(layoutReducer, {
    isSidebarOpened: false,
    isMargin: "10vh",
    isSearchDisabled: false,
    isAuthModalOpened: false,
    authInstance: "signup",
    showNewsLetter: false,
  });

  return (
    <LayoutStateContext.Provider value={state}>
      <LayoutDispatchContext.Provider value={dispatch}>
        {children}
      </LayoutDispatchContext.Provider>
    </LayoutStateContext.Provider>
  );
}

function useLayoutState() {
  var context = React.useContext(LayoutStateContext);
  if (context === undefined) {
    throw new Error("useLayoutState must be used within a LayoutProvider");
  }
  return context;
}

function useLayoutDispatch() {
  var context = React.useContext(LayoutDispatchContext);
  if (context === undefined) {
    throw new Error("useLayoutDispatch must be used within a LayoutProvider");
  }
  return context;
}

export {
  LayoutProvider,
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
  handleMainMargin,
  disableSearch,
  enableSearch,
  toggleAuthModal,
  toggleNewsLetter,
};

// ###########################################################
