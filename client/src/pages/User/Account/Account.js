import React from "react";
import { Link } from "react-router-dom";
import { useUserState } from "../../../contexts";
function Account(props) {
  const { user } = useUserState();
  if (!user) {
    //dispatch status checker
  }
  const { firstName, email, lastName } = user;
  return (
    <div className="account-wrapper">
      <hgroup>
        <h4>Account</h4>
        <p>
          {`${lastName} ${firstName}  `}
          <span>{email}</span> <Link to="/user/profile">go to profile</Link>
        </p>
      </hgroup>
      <div className="account">
        <div>
        <Link to="/user/profile/">
          <span>
            <i className="fa fa-user-circle"></i>
          </span>
          <h5>Personal info</h5>
          <p>
            Provide your personal details and means we can use to reach you.
          </p>
          </Link>
        </div>
        <div>
          <Link to="/user/account/security">
            <span>
              <i className="fa fa-shield-alt"></i>
            </span>
            <h5>Login and security</h5>
            <p>
              Provide your personal details and means we can use to reach you.
            </p>
          </Link>
        </div>
        <div>
          <Link to="/user/account/notifications">
            <span>
              <i className="fa fa-bell"></i>
            </span>
            <h5>Notifications</h5>
            <p>
              Provide your personal details and means we can use to reach you.
            </p>
          </Link>
        </div>

        <div>
          <span>
            <i className="fa fa-credit-card"></i>
          </span>
          <h5>Payments</h5>
          <p>
            Provide your personal details and means we can use to reach you.
          </p>
        </div>
        <div>
          <Link to="/user/account/preferences">
            <span>
              <i className="fa fa-wave-square"></i>
            </span>
            <h5>Preferences</h5>
            <p>
              Provide your personal details and means we can use to reach you.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

Account.propTypes = {};

export default Account;
