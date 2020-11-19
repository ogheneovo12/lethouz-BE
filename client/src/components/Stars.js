import React from "react";
import PropTypes from "prop-types";

//Note rest props is only passed down to styling of the component
export function Stars({ len, ...rest }) {
  if (!parseInt(len)) return null;
  return (
    <span style={{ color: "#ffd700", ...rest }}>
      {len &&
        [...Array(len).keys()].map((star) => (
          <i key={`${star}rateme`} className="fa fa-star"></i>
        ))}
    </span>
  );
}

Stars.propTypes = {
  len: PropTypes.number.isRequired,
};
