import {
  GET_AVAILABLE_PROPERTIES,
  GET_SAVED_SUCCESS,
  PROPERTY_REQUEST_SUCCESS,
  CLEAR_PROPERTY_ERROR,
  CLEAR_PROPERTY_FEEDBACK,
  PROPERTY_REQUEST,
  PROPERTY_REQUEST_ERROR, GET_UPLOADED_SUCCESS
} from "../constants";
import { propertyService } from "../services";
import { uploadFile } from "../utils";

export const getProperties = async (dispatch) => {
  dispatch({ type: PROPERTY_REQUEST });
  propertyService
    .getAllProperties()
    .then((data) => {
      dispatch({ type: GET_AVAILABLE_PROPERTIES, payload: data });
    })
    .catch((error) => propertyService.handleResponseError(dispatch, error));
};

export function uploadProperty(dispatch, property, setLoading, setErrors) {
  setLoading(true);
  const {attachments,...propertyCopy} ={...property};
  propertyService
    .upload(propertyCopy)
    .then((data) => {
      let message = ` ${data.message} `;
      if (data.errors) {
        message = `${
          Object.values(data.errors).join(",") + message
        }, attaching images`;
      }
      uploadFile(attachments, (result) =>
        attachImages(result, data.data._id, dispatch, setLoading)
      );
      dispatch(handleSuccess(message));
    })
    .catch((error) => {
      propertyService.handleResponseError(dispatch, error, setErrors);
      setLoading(false);
    });

  function handleSuccess(message = "") {
    return { type: PROPERTY_REQUEST_SUCCESS, payload: message, selfDestroy:false };
  }
}

export function getUploaded(dispatch) {
  dispatch({type:PROPERTY_REQUEST});
  propertyService
    .getUserUploadedProperties()
    .then((data) => {
      dispatch(handleSuccess(data));
    })
    .catch((error) => {
      propertyService.handleResponseError(dispatch, error);
    });
  function handleSuccess(data) {
    return { type: GET_UPLOADED_SUCCESS, payload: data };
  }
}

export function getAll(dispatch) {
  propertyService
    .getAllProperties()
    .then((data) => {
      dispatch(handleSuccess(data));
    })
    .catch((error) => {
      propertyService.handleResponseError(dispatch, error);
    });
  function handleSuccess(data) {
    return { type: GET_SAVED_SUCCESS, payload: data };
  }
}
export function clearPropertyError(dispatch) {
  dispatch({ type: CLEAR_PROPERTY_ERROR });
}
export function clearPropertyFeedBack(dispatch) {
  dispatch({ type: CLEAR_PROPERTY_FEEDBACK });
}

function attachImages(result, id, dispatch, setLoading) {
  const urls = [];
  for (let i = 0; i < result.length; i++) {
    if (result[i].status === "fulfilled") {
      urls.push(result[i].value.data.url);
    }
  }
  if (urls.length > 0) {
    propertyService
      .updateProperty(id, { attachments: urls })
      .then((data) => {
        setLoading(false);
        dispatch({
          type: PROPERTY_REQUEST_SUCCESS,
          payload: "upload complete, check /property/uploaded to see",
        });
      })
      .catch((error) => {
        dispatch({
          type: PROPERTY_REQUEST_ERROR,
          payload: "could not upload images, apertment saved to draft",
        });
        setLoading(false);
      });
  }
}
export function updateProperty(dispatch,id,data,setLoading, setErrors){
  dispatch({type:PROPERTY_REQUEST});
  setLoading(true);
  const  propertyCopy ={...data};
  const newUploads = propertyCopy.attachments.filter(img => img.isBase64img);
  propertyCopy.attachments = propertyCopy.attachments.filter(img => !img.isBase64img);
  propertyService.updateProperty(id,propertyCopy).then(resp=>{
    uploadFile(newUploads, (result) =>
        attachImages({...result,...propertyCopy.attachments}, id, dispatch, setLoading)
    );
  dispatch(handleSuccess(resp.message));
  }).catch(error=>{
    propertyService.handleResponseError(dispatch, error, setErrors);
    setLoading(false);
  })
  function handleSuccess(message = "") {
    return { type: PROPERTY_REQUEST_SUCCESS, payload: message, selfDestroy:false };
  }
}
export function toggleSaved(dispatch,id){
       propertyService.toggleSaved(id).then(data=>{
       dispatch({type:GET_SAVED_SUCCESS, payload:data});
    }).catch(error=>{
       propertyService.handleResponseError(dispatch,error);
 })
};

export function getSaved(dispatch){
  dispatch({type:PROPERTY_REQUEST});
  propertyService.getUserSavedProperties().then(data=>{
  dispatch({type:GET_SAVED_SUCCESS,payload:data})
  }).catch(error=>{
       propertyService.handleResponseError(dispatch,error);
 })
}