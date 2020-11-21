import React, { createContext, useReducer } from "react";
import { propertyReducer } from "../reducers/";
import {
  getProperties,
  uploadProperty,
  clearPropertyError,
  getUploaded,
  getSaved,
  clearPropertyFeedBack,
  toggleSaved,
  updateProperty
} from "../actions";
import { checkedJsonStorage } from "../utils";
import { Alert } from "../components";
const initialState = {
  properties: checkedJsonStorage("properties") || [],
  error: null,
  loading: null,
  feedback: null,
  saved: checkedJsonStorage("saved") || [],
  uploaded: checkedJsonStorage("uploaded") || [],
  selfdestroy:true,
};
var PropertyDispatchContext = createContext();
var PropertyStateContext = createContext();
//PROPERTYPROVIDER
export const PropertyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(propertyReducer, initialState);

  return (
    <PropertyStateContext.Provider value={state}>
      <PropertyDispatchContext.Provider value={dispatch}>
        {state.error && (
          <Alert
            message={state.error}
            close={() => clearPropertyError(dispatch)}
            selfdestroy={state.selfdestroy}
            property
          />
        )}
        {state.feedback && (
          <Alert
            message={state.feedback}
            close={() => clearPropertyFeedBack(dispatch)}
            selfdestroy={state.selfdestroy}
            property
            type={"success"}
          />
        )}

        {children}
      </PropertyDispatchContext.Provider>
    </PropertyStateContext.Provider>
  );
};
export function usePropertyState() {
  var context = React.useContext(PropertyStateContext);
  if (context === undefined) {
    throw new Error("usePropertyState must be used within a PropertyProvider");
  }
  return context;
}
export function usePropertyDispatch() {
  var context = React.useContext(PropertyDispatchContext);
  if (context === undefined) {
    throw new Error(
      "usePropertyDispatch must be used within a PropertyProvider"
    );
  }
  return context;
}

//export actions
export { getProperties, uploadProperty, getUploaded, toggleSaved, getSaved, updateProperty };
