import React, { useState, useEffect } from "react";
import {
  useLayoutState,
  toggleSidebar,
  useLayoutDispatch,
  buildQuery,
  find,
  usePropertyDispatch,
  useQueryDispatch,
  useQueryState,
} from "../contexts";
import cx from "classname";
import { DropDown, Slider } from "./Forms";
import { Search } from "./Search";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { Spinner } from "./Spinner";

export function Sidebar(props) {
  const { isSidebarOpened } = useLayoutState();
  const layoutDispatch = useLayoutDispatch();
  const queryDispatch = useQueryDispatch();
  const propertyDispatch = usePropertyDispatch();
  const { lat, lng, queryString } = useQueryState();
  const [loading, setLoading ] = useState(false);
  const [houseType, setHouseType] = useState("Apartment");
  const [houseState, setHouseState] = useState({
    label: "new apartment",
    value: "new",
  });
  const [searchValue, setSearchValue] = useState("");
  const houseTypeOptions = [
    { value: "House", label: "House" },
    { value: "Land", label: "Land" },
    { value: "Apartment", label: "Apartment" },
    { value: "Commercial", label: "Commercial" },
    { value: "Co-working", label: "Co-working space" },
  ];
  const houseStateOptions = [
    { label: "new apartment", value: "new" },
    { label: "furnished apartment", value: "furnished" },
    { label: "serviced apartment", value: "serviced" },
  ];
  
  const MIN = 20;
  const start = 0;
  const MAX = 100;
  const [sliderValue, setSliderValue] = useState(MIN);

  useEffect(() => {
    if (lat || lng) {
      buildQuery(queryDispatch, {
        type: houseType,
        state: houseState.value,
        price: String(sliderValue),
        lat,
        lng,
      });
    }
    // eslint-disable-next-line
  }, [sliderValue, houseType,houseState]);

  function handleSliderChange(e) {
    const { value } = e.target;
    if (value >= MIN && value <= MAX) {
      setSliderValue(value);
    }
  }

  return (
    <div className={cx(`sidebar fadein`, isSidebarOpened && "open")}>
      <div className="inner">
        <div className="top">
          <span
            className={"close_icon"}
            onClick={() => {
              toggleSidebar(layoutDispatch);
            }}
          ></span>
          <h5>filter your search</h5>
        </div>

        <form>
          <Search handleValue={setSearchValue} />
          <DropDown
            value={houseType}
            title="house type"
            type="large"
            ghost
            data={houseTypeOptions}
            onChange={({ value, label }) => setHouseType(label)}
          />
          <DropDown
            title="house state"
            data={houseStateOptions}
            type="large"
            ghost
            value={houseState.label}
            onChange={(picked) => setHouseState(picked)}
          />
          <div className="form-control">
            <Slider
              min={start}
              max={MAX}
              value={sliderValue}
              onChange={handleSliderChange}
            />
          </div>
          <button onClick={handleSearch} className="btn btn-primary btn-full">
            {loading ? <Spinner /> : "Search"}
          </button>
        </form>
      </div>
    </div>
  );
  async function handleSearch(e) {
    e.preventDefault();
    try {
      if (searchValue) {
        //GET THE GEOCODE
        const results = await getGeocode({ address: searchValue });
        console.log(results);
        const result = await getLatLng(results[0]);
        const { lat, lng } = result;
        console.log("📍 Coordinates: ", result, { lat, lng });
        makeRequest({lat,lng});
        return;
      }
      //else just use previous lat and lng
      makeRequest({lat,lng});
    } catch (err) {
      console.log("😱 Error: ", err);
    }
  }
  function makeRequest({lat,lng}) {
    buildQuery(queryDispatch, {
      type: houseType,
      price: String(sliderValue),
      lat,
      lng,
    });
    setLoading(true);
    find(queryDispatch, propertyDispatch, queryString).then(
      () => toggleSidebar(layoutDispatch),
      setLoading(false)
    );
  }
}

Sidebar.propTypes = {};
