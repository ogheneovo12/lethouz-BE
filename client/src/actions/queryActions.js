import { PROPERTY_REQUEST_SUCCESS } from "../constants";
import { propertyService } from "../services";

export function buildQuery(dispatch, props) {
  const query = {};
  let queryString = ``;
  for (let key in props) {
    if (props[key]) {
      query[key] = props[key];
      queryString += `${key}=${props[key]}&`;
    }
  }
  //remove the last &
  queryString = queryString.slice(0, queryString.lastIndexOf("&"));
  dispatch({ type: "BUILD_QUERY", payload: { ...query, queryString } });
}

export function find(dispatch, propertyDispatch, queryString) {
  return new Promise((resolve, _)=>{
    propertyService
    .find(queryString)
    .then((data) => {
      dispatch(handleSuccess(data.data));
      propertyDispatch({
        type: PROPERTY_REQUEST_SUCCESS,
        payload: `found ${data.data.length} properties`,
      });
      resolve("ok")
    })
    .catch((error) => {
      propertyService.handleResponseError(propertyDispatch, error);
    });
  })
  function handleSuccess(result) {
    return { type: "QUERY_SUCCESS", payload: result };
  }
}
