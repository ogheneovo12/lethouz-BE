import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_REQUEST,
  ERROR,
  REGISTERATION_SUCCESS,
  CLEAR_FEEDBACK,
} from "../constants";
export function userReducer(state, action) {
  switch (action.type) {
    case REGISTERATION_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated:true,
        user: action.payload.user,
        feedback: action.payload.feedback,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        error: "",
        isLoading: false,
        feedback: "you are logged out",
      };
    case CLEAR_FEEDBACK:
      return { ...state, feedback: "" };
    case ERROR:
      return { ...state, error: action.payload, isLoading: false };
    case LOGOUT_REQUEST:
      return { ...state, isLoading: true };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
