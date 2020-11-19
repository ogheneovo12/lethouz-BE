import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  useLayoutDispatch,
  disableSearch,
  enableSearch,
  usePropertyState,
  usePropertyDispatch,
  toggleAuthModal,
  toggleSaved,
  getSaved
} from "../../contexts";
import { Stars, Modal, Gallery, Can, Spinner, Error } from "../../components";
import { SwiperSlide } from "swiper/react";
import PropTypes from "prop-types";
import { breakpoints } from "./helpers";
import { propertyService } from "../../services";
import cx from "classname";
function Details(props) {
  //initialize sates and get dispatch
  const layoutDispatch = useLayoutDispatch();
  const [showModal, setModal] = useState(false);
  const [property,setProperty] = useState(null);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(null);
  const swiper = useRef(null);
  const getSwiper = (core) => (swiper.current = core);
  const propertyDispatch = usePropertyDispatch();
  const { properties, saved, uploaded } = usePropertyState();
  const PropertyId = props.match.params.id;
 
   
 
  useEffect(() => {
   //check if poperty is in local storage 
   getSaved(propertyDispatch);
   const allProperty = [...new Set([...properties, ...saved, ...uploaded])]; 
   const propertyInLocalStorage = allProperty.find((prop) => prop._id === PropertyId);
   if(propertyInLocalStorage){setProperty(propertyInLocalStorage)}
   else{
      fetchProperty(PropertyId);
   };
   setLoading(false)
    disableSearch(layoutDispatch);
    return () => {
      enableSearch(layoutDispatch);
    };
    // eslint-disable-next-line
  }, []);

  
  //Top  open image modal on click
  const openImage = (index) => {
    setModal(true);
    swiper.current.slideTo(index);
  };
  function pluralise(quantity){
    return quantity > 1 ? "s":"";
  }

  const closeModal = () => setModal(!showModal);

 
  if(error)return <Error  {...error} />
  if(loading) return <Spinner />;
  if (!PropertyId || !property) {
    return <h1>sorry we could not find that property</h1>;
  }
  const { title, purpose, type, details, address, amenities, posted_by, description, currentState } = property;
  const { address: loc, state, lga } = address || {};
  const location = `${loc}, ${lga}, ${state}`;
  const isSaved = saved && saved.find(house => house._id === PropertyId);
  //slides for modalbox and gallery display
  const slides1 = generateDummySlide(true);

  return (
    <div style={{ minHeight: 500 }}>
      <div className="property__text">
        <h3>{title}</h3>
        <p>
          <Stars len={5} fontSize={14} marginRight={5} /> {location}
        </p>
      </div>

      {/* Gallery for displaying images of property */}
      <div className={`gallery`}>
        <button
          onClick={() => setModal(!showModal)}
          className="btn btn-primary btn-more"
        >
          See More Photos
        </button>
        <Gallery
          slides={slides1}
          pagination
          navigation
          breakpoints={breakpoints}
          spaceBetween={10}
        />
      </div>

      {/*Highligths and features of the properties  */}
      <div className="property__highlight">
        <div className="property__details">
          {/* Details of Seller*/}
          <div className="property__details__seller">
            <div>
              <h4>Apartment Owned By {`${posted_by.firstName} ${posted_by.lastName}`}</h4>
              <ul>
                <li>{details.toilets} toilet{pluralise(details.toilets)}</li>
                <li>{details.bedrooms} bedroom{pluralise(details.bedrooms)}</li>
                <li>{details.bathrooms} bathroom{pluralise(details.bathrooms)}</li>
              </ul>
            </div>
            <div className="gravater">
              <Link to={`/${posted_by.username}`}><img src="/img/Ellipse3.png" alt="gravater" /></Link>
            </div>
          </div>

          <div className="divider"></div>

          {/* Todo => this heart icon would be converted to a like component later */}
          <Can
           yes={()=><p id={`${isSaved ? "savedHeart":""}`} style={{ textAlign: "right", fontSize: 12 }}
            onClick={() => toggleSaved(propertyDispatch, PropertyId)}>
            <i className={cx(isSaved ?"fas fa-heart":"far fa-heart")}></i> 
               {isSaved ? " saved" :" save"}
          </p>} 
           no={
             ()=><p  style={{ textAlign: "right", fontSize: 12 }}
                   onClick={() => toggleAuthModal(layoutDispatch,"login")} >
            <i className="far fa-heart"></i> save
          </p>
           }
          />
         

          {/* features of the property */}
          <div className="property__details__features">
            <span className="feature_wrap">
              <p>
                <span>purpose:</span>
                {purpose}
              </p>
              <p>
                <span>type of house:</span>
                {type}
              </p>
            </span>
            <span className="feature_wrap">
              <p>
                <span>size:</span>
                {details && details.size}
              </p>
              <p>
                <span className="point"></span>{currentState}
              </p>
            </span>
          </div>
        </div>
        {/*Action will be converted to a component later, for buying and creating chat service*/}
        <div className="property__actions">
          <div className="action_wrapper">
            <button
              onClick={() => {
                toggleAuthModal(layoutDispatch);
              }}
              className="btn btn-md btn-primary"
            >
              Buy now
            </button>
            <button
              style={{ background: "#ffff" }}
              className="btn btn-md btn-primary-invert"
            >
              Chat with seller
            </button>
          </div>
        </div>
      </div>
      <div className="divider"></div>
      {/* Space of the property described in plain word */}
      <article>
        <div>
          <p style={{ marginTop: 30, fontSize: "1.3rem" }}>
            {description}
          </p>
          <div
            className="property__details__space"
            style={{ marginTop: 10, marginBottom: 30 }}
          >
            <h5>The space</h5>
            <p style={{ fontSize: "1.3rem" }}> testing two</p>
          </div>
        </div>

        <div className="divider"></div>

        {/* Amenities of The property  */}
        <div className="property__details__amenities" style={{ marginTop: 30 }}>
          <h5>Amenities</h5>
          {amenities ? (
            amenities.map(({ icon, type }, index) => (
              <div className="icon-box" key={`${type}index`}>
                <p>
                  <i className={`fa ${icon}`}></i>
                </p>
                <p>{type}</p>
              </div>
            ))
          ) : (
            <h4>No Amenities stated for this property</h4>
          )}
        </div>
      </article>
      {/* Modals */}
      <Modal show={showModal} center closeModal={closeModal}>
        <Gallery slides={slides1}  navigation onInit={getSwiper} />
      </Modal>
    </div>
  );

  function generateDummySlide(event = false) {
    const slides = property && property.attachments.map((photo, index) => (
      <SwiperSlide key={`${photo}un`}>
        <img
          src={photo}
          alt="test"
          onClick={event ? () => openImage(index) : () => {}}
        />
      </SwiperSlide>
    ));
    return slides;
  }

function fetchProperty(id){
       setLoading(true);
       propertyService.fetchProperty(id).then(data=>{
         setLoading(false);
         console.log(data)
         setProperty(data.data)
       })
       .catch(error=>{
        setLoading(false);
         if(error.response){
           const { status, message } = error.response;
           if(status === 404){
             return  setError({type:"missing",message:"sorry we couldnt get this property"});
           }
           if(status === 500){
             return setError({type:"server",message:"oops!something went wrong"})
           }
          setError(message);
         }else if(error.request){
           return  setError({type:"network",message:"something is wrong with your network"})
         }
         setError({type:"normal",error:error.message});
       }) 
  }
}

Details.defaultProps = {
  title: "title not stated",
  space: "No details yet",
  describtion: "cheap affordable property",
  address: "not stated please kindly notify seller",
  rating: 0,
};
const requiredString = PropTypes.string.isRequired;
Details.propTypes = {
  title: requiredString,
  space: requiredString,
  describtion: requiredString,
  address: requiredString,
  rating: PropTypes.number.isRequired,
};

export default Details;
