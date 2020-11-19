import React from "react";
import { Link } from "react-router-dom";
import { useUserState } from "../contexts";
import { Can } from "./Can";

//import PropTypes from 'prop-types'

export function Toolbox({ toggleMenu, toggleAuth }) {
  const { user, autoCheckStatus } = useUserState();
  if (!user) {
    autoCheckStatus();
  }
  let profileImage = `https://robohash.org/${user && user.email}`;
  if (user && user.profileImage) {
    profileImage = user.profileImage;
  }
  return (
    <nav className="toolbox">
      <span className="toolbox__tool like">
        <i className="far fa-heart"></i>
      </span>
      <span className="toolbox__tool notf">
        <i className="fa fa-bell"></i>
      </span>
      <span className="toolbox__tool avatar">
        <Can
          role="auth"
          yes={() => (
            <Link to="/user/profile">
              <img src={profileImage} alt="dp" />
            </Link>
          )}
          no={() => (
            <span className="gravplace">
              <i className="fa fa-user"></i>
            </span>
          )}
        />
      </span>
      <span className="toolbox__tool open-menu" onClick={toggleMenu}>
        {" "}
        <i className="fa fa-bars"></i>
      </span>
    </nav>
  );
}

Toolbox.propTypes = {};
