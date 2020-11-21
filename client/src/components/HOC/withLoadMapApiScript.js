import { useLoadScript } from "@react-google-maps/api";
import { libraries } from "../../constants/";

export function WithMapApiScript(props) {
  const { loadError, isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY,
    libraries,
  });
  return props.children({ loadError, isLoaded });
}
