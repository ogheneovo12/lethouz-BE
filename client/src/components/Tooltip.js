import React from "react";
import { Link } from "react-router-dom"
//import PropTypes from 'prop-types'
import { Seller } from "./index";
export function Tooltip({_id, title, address, price, posted_by, onClose }) {
  const loc = `${address.address} ${address.lga} ${address.state}`
  return (
    <div className="tooltip">
      <span className="close" onClick={onClose}>
        <i className="fa fa-times"></i>
      </span>
      <div className="tooltip__image">
        <img src="/img/house.png" alt="propetyimage" />
      </div>
      <div className="tooltip__property">
        <hgroup>
          <h5>{title}</h5>
          <p className="location">{loc}</p>
        </hgroup>
        <p className="price">{price}</p>
      </div>
      <div>
        <h5>seller</h5>
        <Seller username={posted_by.username || posted_by.lastName} profileImage={ posted_by.profileImage || `https://robohash.org/${posted_by.email}`} />
        <div className="tooltip__cta">
          <Link to={`/property/view/${_id}`} className="btn-primary btn-full">
            More Details
          </Link>
        </div>
      </div>
    </div>
  );
}

Tooltip.propTypes = {};
