import {
  TOGGLE_SIDEBAR,
  PUT_MARGIN,
  NO_MARGIN,
  DISABLE_SEARCH,
  ENABLE_SEARCH,
  SHOW_NEWSLETTER,
} from "../constants";

export function handleMainMargin(dispatch, isMargin) {
  if (isMargin) {
    return dispatch({ type: PUT_MARGIN });
  }
  dispatch({ type: NO_MARGIN });
}

export function toggleSidebar(dispatch) {
  dispatch({
    type: TOGGLE_SIDEBAR,
  });
}

export function disableSearch(dispatch) {
  dispatch({
    type: DISABLE_SEARCH,
  });
}

export function enableSearch(dispatch) {
  dispatch({
    type: ENABLE_SEARCH,
  });
}

export function toggleAuthModal(dispatch, instance = "signup") {
  dispatch({ type: "TOGGLE_AUTH_MODAL", payload: instance });
}

export function toggleNewsLetter(dispatch) {
  dispatch({ type: SHOW_NEWSLETTER });
}
