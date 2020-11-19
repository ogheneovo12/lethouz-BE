import React from "react";
import { Uploaded as UploadedGrid } from "../../components"

//import PropTypes from 'prop-types'

function Uploaded(props) {
  return (
    <div className="saved" style={{ paddingTop: 50 }}>
      <h3>Uploaded</h3>
      <div className="divider"></div>
      <div className="Property_wrapper">
        <UploadedGrid />
     </div>
    </div>
  );
}

Uploaded.propTypes = {};

export default Uploaded;
