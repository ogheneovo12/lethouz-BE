import {
  TOGGLE_SIDEBAR,
  TOGGLE_PERMANENT,
  PUT_MARGIN,
  NO_MARGIN,
  DISABLE_SEARCH,
  ENABLE_SEARCH,
  TOGGLE_AUTH_MODAL,
  SHOW_NEWSLETTER,
} from "../constants";

export function layoutReducer(state, action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        isSidebarOpened: !state.isSidebarOpened,
      };
    case TOGGLE_PERMANENT:
      return { ...state, isPermanent: action.payload };
    case PUT_MARGIN:
      return { ...state, isMargin: "10vh" };
    case NO_MARGIN:
      return { ...state, isMargin: 0 };
    case DISABLE_SEARCH:
      return { ...state, isSearchDisabled: true };
    case ENABLE_SEARCH:
      return { ...state, isSearchDisabled: false };
    case TOGGLE_AUTH_MODAL:
      return {
        ...state,
        isAuthModalOpened: !state.isAuthModalOpened,
        authInstance: action.payload,
      };
    case SHOW_NEWSLETTER:
      return {
        ...state,
        showNewsLetter: !state.showNewsLetter,
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
