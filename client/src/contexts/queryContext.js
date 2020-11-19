import React, { createContext, useReducer } from "react";
import { queryReducer } from "../reducers";
import {
 buildQuery,
 find
} from "../actions";

const initialState = {
   result:[],
   state:"",
   lat:3.3112093,
   lng: 6.6252564,
   radius:10,
   minPrice:"",
   maxPrice:"",
   feedback:"",
   queryString:``
};
var QueryDispatchContext = createContext();
var QueryStateContext = createContext();
//PROPERTYPROVIDER
export const QueryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(queryReducer, initialState);
  return (
    <QueryStateContext.Provider value={state}>
      <QueryDispatchContext.Provider value={dispatch}>
        {children}
      </QueryDispatchContext.Provider>
    </QueryStateContext.Provider>
  );
};
export function useQueryState() {
  var context = React.useContext(QueryStateContext);
  if (context === undefined) {
    throw new Error("useQueryState must be used within a QueryProvider");
  }
  return context;
}
export function useQueryDispatch() {
  var context = React.useContext(QueryDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useQueryDispatch must be used within a QueryProvider"
    );
  }
  return context;
}

//export actions
export { buildQuery,find };
