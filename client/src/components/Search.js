import React from "react";
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
  buildQuery,
  useQueryDispatch,
} from "../contexts";

import { ReactComponent as Filter } from "./filter.svg";
import cx from "classname";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { WithMapApiScript } from "./HOC";
//import PropTypes from 'prop-types'
//to make ismobile run on every resize

const normalInputStyle = {
  width: "100%",
  border: "none",
};
export function LoadedSearch({ inhead, handleValue, filter }) {
  const { isSearchDisabled } = useLayoutState();
  const layoutDispatch = useLayoutDispatch();
  const queryDispatch = useQueryDispatch();
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
    if (handleValue) handleValue(e.target.value);
  };

  const handleSelect = ({ description }) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    setValue(description, false);
    //send value upward
    clearSuggestions();

    // Get latitude and longitude via utility functions
    getGeocode({ address: description })
      .then((results) => getLatLng(results[0]))
      .then((result) => {
        const { lat, lng } = result;
        console.log("📍 Coordinates: ", result, { lat, lng });
        buildQuery(queryDispatch, { lat, lng });
      })
      .catch((error) => {
        console.log("😱 Error: ", error);
      });
  };

  const renderSuggestions = () =>
    data.map((suggestion, index) => {
      const {
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={`${index}${main_text}`} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div
      className={cx(
        `search`,
        isSearchDisabled && "disabled",
        inhead && "inhead"
      )}
    >
      <input
        type="text"
        value={value}
        onChange={handleInput}
        placeholder="search for a place"
        disabled={isSearchDisabled || !ready}
        style={!filter ? normalInputStyle : null}
      />
      {filter && (
        <span
          className="search__icon"
          onClick={() => {
            toggleSidebar(layoutDispatch);
          }}
        >
          <span className="text">filter</span><Filter />
        </span>
      )}
      <ul className="dropdown">{status === "OK" && renderSuggestions()}</ul>
    </div>
  );
}

const LoadingSearch = () => <div className={cx(`search`, "disabled")}></div>;

export const Search = (props) => {
  return (
    <WithMapApiScript>
      {({ isLoaded }) => {
        if (!isLoaded) return <LoadingSearch />;
        return <LoadedSearch {...props} />;
      }}
    </WithMapApiScript>
  );
};
