import React from "react";
import { Stars } from "./Stars";
import { Link } from "react-router-dom"
//import PropTypes from "prop-types";

export function Seller({username, profileImage}) {
  return (
    <div className="seller">
      <div className="gravater">
        <Link to={`/${username}`}><img src={profileImage} alt="userdp" /></Link>
      </div>
      <div className="seller__info">
        <p className="seller__name">
         {username}
          <small className="status">
            <i className="fa fa-check-circle"></i>
          </small>
        </p>
        <p className="seller__rating">
          <Stars len={5} />
        </p>
      </div>
    </div>
  );
}

Seller.propTypes = {};
