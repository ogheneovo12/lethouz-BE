import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Stars } from "./Stars";

export function Suggestion({ _id, title, address, price, minimal, attachments }) {
  const { address: loc, state, lga } = address || {};
  const location = `${loc}, ${lga}, ${state}`;
  return (
    <div className="suggestion">
      <Link to={`/property/view/${_id}`}>
        <div className="suggestion__image">
          <img src={attachments[0]} alt="propertyimage" />
        </div>
      </Link>
      <div className="suggestion__info">
        <h5 className="title">{title && title.toLowerCase()}</h5>
        <div style={{ position: "relative" }}>
          <p className="location">
            <span>
              <i className="fa fa-map-marker-alt"></i>
            </span>
            <span>{location.toLowerCase()}</span>
          </p>
          <Stars len={5} position="absolute" right={0} top={0} />
        </div>
        {!minimal && <p className="price">{price ? price : "not stated"}</p>}
      </div>
    </div>
  );
}

Suggestion.defaultProps = {
  title: "LETHOUZ PROPERTY NOT AVAILABLE",
  location: "not stated",
  address: {},
};
Suggestion.propTypes = {
  title: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};
