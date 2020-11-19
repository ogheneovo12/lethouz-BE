import React, { useState } from "react";
import UpdateForm from "./UpdateForm";

function Security(props) {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const toggleUpdateForm = () => setShowUpdateForm(!showUpdateForm);

  return (
    <div style={{ padding: "0px 30px" }}>
      <h2>Security</h2>
      <div className="divider"></div>
      <div className="content_wrapper">
        <section>
          <h3>Login</h3>
          <div className="action_region">
            <h5>
              <i className="fa fa-key"></i> password
            </h5>
            <button onClick={toggleUpdateForm}>
              {showUpdateForm ? <span>close</span> : <span>update</span>}
            </button>
            {showUpdateForm ? <UpdateForm /> : <p>last updated 24/9/2020</p>}
          </div>
          <div className="divider"></div>
        </section>
        <section>
          <h3>Social acoount</h3>
          <div className="action_region">
            <h5>
              <i className="fab fa-facebook"></i>acebook
            </h5>
            <p>Connected</p>
            <button>Disconnect</button>
          </div>
          <div className="divider"></div>
          <div className="action_region">
            <h5>
              <i className="fab fa-google"></i>oogle
            </h5>
            <p>Not conected</p>
            <button>Connect</button>
          </div>
          <div className="divider"></div>
        </section>
      </div>
    </div>
  );
}

Security.propTypes = {};

export default Security;
