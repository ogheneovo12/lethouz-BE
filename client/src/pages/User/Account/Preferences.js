import React from "react";
//import PropTypes from 'prop-types'

function Preferences(props) {
  return (
    <div style={{ padding: "0px 30px" }}>
      <h2>Prefrences</h2>
      <div className="divider"></div>
      <div className="content_wrapper">
        <section>
          <div className="action_region">
            <h5>Prefered Language</h5>
            <p>English</p>
            <button>Edit</button>
          </div>
          <div className="divider"></div>
          <div className="action_region">
            <h5>Preffered Currency</h5>
            <p>Naira</p>
            <button>Edit</button>
          </div>
          <div className="divider"></div>
          <div className="action_region">
            <h5>Timezone</h5>
            <p>GMT+1 (west,central africa)</p>
            <button>Edit</button>
          </div>
          <div className="divider"></div>
        </section>
      </div>
    </div>
  );
}

Preferences.propTypes = {};

export default Preferences;
