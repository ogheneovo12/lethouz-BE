import React,{ useState, useEffect } from "react";
import { enableSearch, disableSearch, useLayoutDispatch, findUser, findUserApartment } from "../contexts";
import { UploadedUI } from "../components"

//import PropTypes from 'prop-types'

export function Profile(props) {
  const sellerName = props.match.params.username;

  const [loading,setLoading] = useState(true);
  const [houseError,setHouseError] = useState("");
  const [houseLoading,setHouseLoading] = useState(true);
  const [houses,setUserHouses] = useState([]);
  const [error,setError] = useState("");
  const [seller, setSeller] = useState(null);

  const layoutDispatch = useLayoutDispatch();
  
  const errors = {
    "USER_NOTFOUND":`user ${sellerName} does not exist`,
    "CANT_FETCH":`something went wrong`
  }
  useEffect(() => {
      findUser(sellerName).then(user =>{
        setSeller(user);
        setLoading(false);
      }).catch(error=>{
        setLoading(false);
        setError(errors[error.type]);
      })
     disableSearch(layoutDispatch);
     return () => {
     enableSearch(layoutDispatch);
     };
     // eslint-disable-next-line
   }, []);
  
   useEffect(()=>{
     findUserApartment(sellerName).then(houses =>{
       setUserHouses(houses);
       setHouseLoading(false);
     }).catch(error=>{
       setHouseError(error.type);
       setHouseLoading(false);
      });
   },[seller, sellerName])
  const {
    firstName = "user does not exist",
    lastName = sellerName,
    createdAt,
    profileImage /** import profile photo*/,
  } = seller || {};

  return (
    <div className="profile">
      <div className="profile__header"> </div>
      <div className="card_wrap">
        <div className="profile__card">
          <div className="profile__card__picture" style={{background:"red"}}>
           {seller && <img
              src={profileImage || `https://robohash.org/${seller && seller.email}`}
              alt="user_dp"
            />
            }
          
          </div>
          <h5>{sellerName}</h5>
         {seller && <div className="profile__card__badge">
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
          </div>}
        </div>
        <div className="profile__info" style={{ padding: 30 }}>
         { loading ? <div className="skeleton">fetching user...</div> : <h4>
           {error ? error : `Hi, i am ${lastName && lastName}  ${firstName && firstName}`}
          </h4>
     }
          <p>joined {seller ? new Date(createdAt).getFullYear() : "never"}</p>
        </div>
      </div>
      <div style={{display:"flex", justifyContent:"space-between", padding:20}}>
          <h5> properties uploaded by {sellerName}</h5>
      </div> 
      <div className="divider"></div>
      {!houseError && <UploadedUI limit={0}  error={houseError} loading={houseLoading} uploaded={houses} isGuest/>}
    </div>
  );
}


Profile.propTypes = {};


