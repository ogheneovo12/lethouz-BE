export const GET_AVAILABLE_PROPERTIES = "GET_AVAILABLE_PROPERTIES", //all
  GET_SAVED_SUCCESS = "GET_SAVED_SUCCESS", //saved
  GET_UPLOADED_SUCCESS = "GET_UPLOADED_SUCCESS", //uploaded
  SEARCH_PROPERTIES = "SEARCH_PROPERTIES", //search
  PROPERTY_REQUEST = "PROPERTY_REQUEST", //loadin from server
  PROPERTY_REQUEST_SUCCESS = "PROPERTY_REQUEST_SUCCESS ", //loaded/uploaded all
  PROPERTY_REQUEST_ERROR = "PROPERTY_REQUEST_ERROR", //error
  CLEAR_PROPERTY_ERROR = "CLEAR_PROPERTY_ERROR", //clear error
  CLEAR_PROPERTY_FEEDBACK = "CLEAR_PROPERTY_FEEDBACK", //clear feedback
  PROPERTY_API_BASEURL =
  process.env.REACT_APP_LIVE_DEPLOY ===  "LIVE_DEPLOY"
      ? "https://lethouz.herokuapp.com/api/apartment"
      : "http://localhost:9000/api/apartment";
/**        MEHN THIS IS THE ONLY ART I KNOW               **/
