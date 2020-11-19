import Axios from "axios";
import {
  PROPERTY_API_BASEURL,
  PROPERTY_REQUEST_ERROR,
  USER_API_BASEURL,
} from "../constants";

export const propertyService = {
  upload,
  updateProperty,
  find,
  handleResponseError,
  getAllProperties,
  getUserUploadedProperties,
  getUserSavedProperties,
  fetchProperty,
  toggleSaved,

};

const requestOptions = { withCredentials: false };

export function upload(property) {
  return Axios.post(`${PROPERTY_API_BASEURL}`, property, requestOptions).then(
    (data) => {
      //save to storage
      return data.data;
    }
  );
}

function getAllProperties() {
  return Axios.get(`${PROPERTY_API_BASEURL}/featured`, requestOptions).then(
    (data) => {
      return data.data;
    }
  );
}

function getUserUploadedProperties() {
  return Axios.get(`${USER_API_BASEURL}user/apartment`, requestOptions).then(
    (response) => {
      localStorage.setItem("uploaded", JSON.stringify(response.data.data));
      return response.data.data;
    }
  );
}
function getUserSavedProperties() {
  return Axios.get(`${USER_API_BASEURL}user/saved`, requestOptions).then(
    (response) => {
      localStorage.setItem("saved", JSON.stringify(response.data.data));
      return response.data.data;
    }
  );
}

function updateProperty(id,data){
    return Axios.put(`${PROPERTY_API_BASEURL}/${id}`,data,requestOptions)
    .then(data=>{
           console.log(data);
           return data;
    })
};
function find(queryString) {
   return Axios.get(`${PROPERTY_API_BASEURL}/?${queryString}`,requestOptions).then(data =>{
     localStorage.setItem("properties",JSON.stringify(data.data.data))
     return data.data;
   })
}
function fetchProperty(id){
  return Axios.get(`${PROPERTY_API_BASEURL}/${id}`,requestOptions)
          .then(data=>{
             localStorage.setItem("saved",JSON.stringify(data.data));
            return data.data
      });
}

function toggleSaved(id){
    return Axios.put(`${USER_API_BASEURL}/user/saved`,{apartment:id},requestOptions).then(response=>{
      return response.data.data.savedApartments
    })
}
function handleResponseError(dispatch, error, setErrors) {
if(!error) error = new Error("something happened");
  if (error.response) {
    const {
      status,
      data: { message, errors },
    } = error.response;
    if (status === 401) {
      //todo open login modal,
      //todo if closed without login request, log user out
      return dispatch(handleFailure("you must login to continue"));
    }
    if (status === 400) {
      if (setErrors) {
        return setErrors(errors);
      }
    }
    if (status === 500) {
      if (errors && errors instanceof Object) {
        return dispatch(handleFailure(`${message}  ${Object.values(errors)}`));
      }
    }
    dispatch(handleFailure(message));
  }
  dispatch(handleFailure(error.message));
  function handleFailure(message = "") {
    return { type: PROPERTY_REQUEST_ERROR, payload: message };
  }
}
