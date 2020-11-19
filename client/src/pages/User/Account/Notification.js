import React from "react";
import { Alert } from "../../../components";

function Notification(props) {
  return (
    <div className="notfpage">
      <h3>
        Notifications{" "}
        <span>
          <i className="fa fa-bell"></i>
        </span>
      </h3>
      <div className="divider"></div>
      <Alert />
      <Alert type="error" message="this is Error Alert" />
    </div>
  );
}

export default Notification;
