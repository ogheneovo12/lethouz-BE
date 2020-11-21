import React from "react";
import { useUserState } from "../../contexts";
import { Uploaded } from "../../components"
import { Link } from "react-router-dom"
//import PropTypes from 'prop-types'

 function Profile(props) {
  const { user, autoCheckStatus } = useUserState();
  
  if (!user) {
    autoCheckStatus();
  }
  const {
    firstName,
    lastName,
    createdAt,
    profileImage /** import profile photo*/,
  } = user;

  return (
    <div className="profile">
      <div className="profile__header"> </div>
      <div className="card_wrap">
        <div className="profile__card">
          <div className="profile__card__picture">
            <img
              src={profileImage || `https://robohash.org/${user && user.email}`}
              alt="user_dp"
            />
            <a href="/">change photo</a>
          </div>
          <div className="profile__card__badge">
            <h4>
              <i className="fa fa-shield-alt"></i>
            </h4>
            <h5>Identity verification</h5>
            <p>
              show others that you are really you with the verification badge
            </p>
            <a
              style={{ marginTop: 30 }}
              className="btn btn-primary-invert btn-md"
              href="/user/getbadge"
            >
              Get the badge
            </a>
          </div>
        </div>
        <div className="profile__info" style={{ padding: 30 }}>
          <h4>
            Hi, i am {`${lastName && lastName}  ${firstName && firstName}`}
          </h4>
          <p>joined {new Date(createdAt).getFullYear()}</p>
          <p>
            <u>edit profile</u>
          </p>
        </div>
      </div>
      <div style={{display:"flex", justifyContent:"space-between", padding:20}}>
      <h5>uploaded properties</h5>
      <Link to="/property/uploaded"><h5>view all</h5></Link>
      </div> 
      <div className="divider"></div>
      <Uploaded limit={8} />
    </div>
  );
}

export default Profile
Profile.propTypes = {};


