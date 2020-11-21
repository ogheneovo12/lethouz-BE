import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  center,
  mapContainerStyle,
  options,
} from "../../constants/map.constant";
import { WithMapApiScript } from "../HOC";
import BaseMap from "./BaseMap";
import PropertyBox from "./PropertyBox";
import { ReactComponent as LoadMap } from "./Bitmap.svg";
import { dummy } from "./dummy";
import {
  useQueryState,
  find,
  useQueryDispatch,
  usePropertyDispatch,
  buildQuery,
} from "../../contexts";
import { calculateRadius, getUserLocation } from "../../utils";
import { Spinner } from "../Spinner";

export function Map(props) {
  const [markers, setMarkers] = useState([...dummy.features]);
  const [selected, setSelected] = useState(null);
  const { result, queryString, lat, lng } = useQueryState();
  const queryDispatch = useQueryDispatch();
  const propertyDispatch = usePropertyDispatch();
  const mapRef = useRef();
  const myCenter = useRef(center);
  useEffect(() => {
    getUserLocation()
      .then(({ latitude: lat, longitude: lng }) => {
        myCenter.current = { lat, lng };
        buildQuery(queryDispatch,{ lat, lng })
        //console.log(myCenter.current)
      })
      .catch((err) => {
        //do nothing
      });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (queryString) {
      find(queryDispatch, propertyDispatch, queryString);
    }
    // eslint-disable-next-line
  }, [queryString]);

  useEffect(() => {
    setMarkers(result);
  }, [result]);

  const onMapLoads = useCallback((Map) => {
    mapRef.current = Map;
    // mapRef.current.fitBounds(boundaries);
  }, []);

  useEffect(() => {
    if (mapRef.current && (lat || lng)) {
      mapRef.current.panTo({ lat, lng });
    }
  }, [lat, lng]);

  function handleBoundsChage() {
      buildQuery(queryDispatch,{radius:getMapRadius().radius,lat,lng})
  }

  function handleDragEnd(){
      buildQuery(queryDispatch,{radius:getMapRadius().radius, ...getMapRadius().center})
  }

  function getMapRadius(){
    let radius = 300; //default value
    let center = myCenter.current;
    if (mapRef.current) {
      const { lat:clat, lng:clng} = mapRef.current.getCenter();
      const  { lat  } = mapRef.current.getBounds().getNorthEast();
      center ={lat:clat(), lng:clng()};
      radius= calculateRadius(center,{lat:lat(), lng:clng()});
    }
    return {radius, center};//center for dragend
  }

  return (
    <div className="map">
      <WithMapApiScript>
        {({ loadError, isLoaded }) => {
           if (loadError)
           return <LoadStatus loadError={loadError} />;
          if(!isLoaded) return <LoadStatus loading={!isLoaded} />;
          // if( ) return loading;
          return (
            <BaseMap
              markers={markers}
              onMarkerClick={setSelected}
              selectedMarker={selected}
              mapContainerStyle={mapContainerStyle}
              zoom={16}
              center={myCenter.current}
              options={options}
              onLoad={onMapLoads}
              onBoundsChanged={handleBoundsChage}
              onDragEnd = {handleDragEnd}
              customBox={
                <PropertyBox
                  selected={selected}
                  onClose={() => setSelected(null)}
                />
              }
            />
          );
        }}
      </WithMapApiScript>
    </div>
  );
}

function LoadStatus({ loading, loadError }) {
  return (
    <div style={{ position: "relative" }}>
      <LoadMap width="100%" height="100%" />
      <div className="map_load_status">
      {
          loadError && (
            <>
              <span><i className="fas fa-sad-cry" ></i></span>
              <h5>failed to load map</h5>
            </>
          )
        }
        {loading && (
          <>
            <Spinner />
            <h5>Please wait loading map</h5>
          </>
        )}
      </div>
    </div>
  );
}
Map.propTypes = {};