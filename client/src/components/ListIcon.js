import React from "react";
import PropTypes from "prop-types";
export function ListWrapper({ children }) {
  return <ul className="icon-list">{children}</ul>;
}
export function List({ icon, main, sub }) {
  return (
    <li>
      <p className="icon">
        <i className={`fa ${icon}`}></i>
      </p>
      <span>
        <h5>{main}</h5>
        <p>{sub}</p>
      </span>
    </li>
  );
}

List.prototype = {
  main: PropTypes.string,
  sub: PropTypes.string,
  icon: PropTypes.string,
};
List.defaultProps = {
  main: "No feature header was headded",
  icon: "fa-home",
};
