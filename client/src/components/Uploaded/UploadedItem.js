import React from 'react'
import { Link } from "react-router-dom";
//import PropTypes from 'prop-types'

function UploadedItem({ _id, title, address, price, minimal, isGuest, attachments }) {
    const { address: loc, state, lga } = address || {};
    const location = `${loc}, ${lga}, ${state}`;
    return (
        <div className="uploaded_item">
        <div className="uploaded_item__image">
              <img src={attachments[0]} alt="uploaded " />
        </div>
        <div className="uploaded_item__details">
            <div className="uploaded_item__details__text">
                <h5>{title}</h5>
                <p>{location}</p>
            </div>
            <div className="uploaded_item__details__actions">
            <Link to={`/property/view/${_id}`}> <button className="btn-primary block" ><i className="fa fa-eye"></i></button></Link>
             {!isGuest && <Link to={`/property/add/?tag=edit&id=${_id}`}><button className="btn-primary-invert block"><i className="fa fa-edit"></i></button></Link>}
            </div>
        </div>
      </div>
    )
}

UploadedItem.propTypes = {

}

export default UploadedItem

