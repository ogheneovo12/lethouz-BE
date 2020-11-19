import {
  GET_AVAILABLE_PROPERTIES,
  PROPERTY_REQUEST_SUCCESS,
  PROPERTY_REQUEST_ERROR,
  GET_UPLOADED_SUCCESS,
  GET_SAVED_SUCCESS,
  PROPERTY_REQUEST,
  CLEAR_PROPERTY_FEEDBACK,
  CLEAR_PROPERTY_ERROR,
} from "../constants";
export function propertyReducer(state, action) {
  switch (action.type) {
    case GET_AVAILABLE_PROPERTIES:
      return { ...state, loading: false, properties: action.payload };
    case GET_SAVED_SUCCESS:
      return { ...state, loading: false, saved:action.payload };
    case GET_UPLOADED_SUCCESS:
      return { ...state, loading: false, uploaded: action.payload };
    case PROPERTY_REQUEST:
      return { ...state, loading: true };
    case PROPERTY_REQUEST_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        feedback: action.payload,
        selfdestroy: action.selfdestroy || true,
      };
    case PROPERTY_REQUEST_ERROR:
      return { ...state, error: action.payload, loading: false };
    case CLEAR_PROPERTY_ERROR:
      return { ...state, error: "", loading: false };
    case CLEAR_PROPERTY_FEEDBACK:
      return { ...state, feedback: "" };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
