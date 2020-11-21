import {
  ERROR,
  CLEAR_FEEDBACK,
  REGISTERATION_SUCCESS,
  PROPERTY_REQUEST_SUCCESS,
  LOGOUT_SUCCESS,
  LOGIN_SUCCESS
} from "../constants";
import { userService } from "../services";
import { history } from "../helpers"
export function loginUser(
  dispatch,
  isAuthenticated,
  email,
  password,
  closeModal,
  setLoading,
  setErrors
) {
  setLoading(true);
  userService.login(email, password).then(
    (user) => {
      setLoading(false);
      closeModal();
      handleLogIn(dispatch, user);
    },
    (error) => {
      setLoading(false);
      if (error.response) {
        if (error.response.status === 403) {
          return checkUserLoginStatus(
            dispatch,
            isAuthenticated,
            closeModal
          );
        }
      }
     handleResponseErrors(error, dispatch, setErrors);
    }
  );
}

export function register(dispatch, user, setLoading, setErrors, closeModal) {
  setLoading(true);
  userService.register(user).then(
    (user) => {
      setLoading(false);
      closeModal();
      handleLogIn(dispatch, user);
    },
    (error) => {
      setLoading(false);
      handleResponseErrors(error, dispatch, setErrors);
    }
  );
}

export const signOut = async (dispatch) => {
  userService.logout().then(handleLogout(dispatch)).catch(handleLogout(dispatch));
};

export function changeUserPassword(
  dispatch,
  passwords,
  setLoading,
  setErrors,
  propertyDispatch
) {
  setLoading(true);
  userService
    .changeUserPassword(passwords)
    .then((data) => {
      setLoading(false);
      dispatch({
        type: REGISTERATION_SUCCESS,
        payload: { user: data.data, feedback: data.message },
      });
      //using the property feedback alert here because its more visable
      propertyDispatch(PropertyAlert(data.message));
    })
    .catch((error) => {
      setLoading(false);
     handleResponseErrors(error, dispatch, setErrors);
    });
  function PropertyAlert(message = "") {
    return { type: PROPERTY_REQUEST_SUCCESS, payload: message };
  }
}

export function findUser(username){
  return new Promise((resolve,reject)=>{
     userService.findUser(username).then(user=>{
         resolve(user.data);
     }).catch(error=>{
       if(error.response){
         if(error.response.status === 404){
          return reject({type:"USER_NOTFOUND"})
         }
       }
        return reject({type:"CANT_FETCH"})
     })
  })
}
export function findUserApartment(username){
  return new Promise((resolve,reject)=>{
     userService.findUserApartment(username).then(apartment=>{
         resolve(apartment.data);
     }).catch(error=>{
       if(error.response){
         if(error.response.status === 404){
          return reject({type:"USER_APARTMENT_NOTFOUND"});
         }
       }
        return reject({type:"CANT_FETCH_APARTMENT"});
     })
  })
}
export async function checkUserLoginStatus(dispatch, isAuthenticated,closeModal) {
  userService
    .confirmLoginStatus()
    .then((data) => {
      if (data && !isAuthenticated) {
        if (closeModal) closeModal();
        return handleLogIn(dispatch, data.data);
      } else if (!data && isAuthenticated) {
        if (closeModal) closeModal();
        return handleLogout(dispatch);
      }
    })
    .catch((error) => {
      //if (closeModal) closeModal();
      if (error.response) {
        if (error.response.status === 401 && !isAuthenticated) {
          return; //keep the user logged out
        }
      }
      handleResponseErrors(error, dispatch, null, true);
    });
}
export const clearError = (dispatch) => dispatch({ type: ERROR, payload: "" });
export const clearFeedBack = (dispatch) => dispatch({ type: CLEAR_FEEDBACK });
function handleLogout(dispatch) {
  dispatch({ type: LOGOUT_SUCCESS });
  history.push("/");
}
function handleLogIn(dispatch, user) {
  alert("loggin user in");
  dispatch({
    type: LOGIN_SUCCESS,
    payload: { user, feedback: `welcome back ${user.lastName}` },
  });
}
export function handleResponseErrors(error, dispatch, setErrors, noAlert) {
  if (error.response) {
    const {
      status,
      data: { message, errors },
    } = error.response;
    if (status === 401) {
      handleLogout(dispatch);
      return;
    }
    if (status === 404) {
      return; //user not found
    }
    //for form validations
    if (status === 400) {
      if (setErrors) {
        return setErrors(errors);
      }
    }
    if (noAlert) return;
    return dispatch(handleError(message));
  }
  if (noAlert) return;
  dispatch(handleError(error.message));
}

function handleError(error) {
  return { type: ERROR, payload: error };
}
