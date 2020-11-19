import React from "react";
import PropTypes from "prop-types";
import { GoogleMap, Marker } from "@react-google-maps/api";

function BaseMap({
  markers,
  selectedMarker,
  onMarkerClick,
  customBox,
  ...rest
}) {
  return (
    <GoogleMap {...rest}>
      {markers &&
        markers.map((marker) => {
          const [lng, lat] = marker.geometry.coordinates;
          return (  
            <Marker
              key={marker._id}
              position={{ lat: +lat, lng: +lng }}
              icon={{
                url: "/img/marker.png",
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(-100, 40),
                scaledSize:new window.google.maps.Size(40, 40)
              }}
              onClick={
                onMarkerClick
                  ? () => {
                      onMarkerClick(marker);
                    }
                  : void 0
              }
            />
          );
        })}
      {selectedMarker ? customBox && customBox : null}
    </GoogleMap>
  );
}

BaseMap.propTypes = {
  markers: PropTypes.array,
  selectedMarker: PropTypes.object,
  onMarkerClick: PropTypes.func,
  customBox: PropTypes.object,
};

export default BaseMap;
