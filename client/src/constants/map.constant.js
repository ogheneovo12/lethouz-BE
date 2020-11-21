export const libraries = ["places"];

export const mapContainerStyle = {
  height: "100vh",
  width: "100%",
};

export const center = {
  lat:4.824167,
  lng:7.033611,
};


export const testMarker = {
  lat: 6.49311,
  lng: 3.38416,
  time: new Date(),
};

export const options = {
  disableDefaultUI: true,
  zoomControl: true,
  //strictBounds: false,
};

export const infoBoxOptions = {
  closeBoxURL: "",
  enableEventPropagation: true,
  disableAutoPan: false,
  zIndex: 0,
  isHidden: false,
  pane: "floatPane",
};
