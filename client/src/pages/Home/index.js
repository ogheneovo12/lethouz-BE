import React, { useEffect, useState } from "react";
//import PropTypes from 'prop-types'
import {
  Map,
  Suggestion,
  withCarousel,
  Spinner,
  Sidebar,
} from "../../components";
import {
  useLayoutDispatch,
  toggleNewsLetter,
} from "../../contexts";
import { propertyService } from "../../services";

export function Home(props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [featured, setFeatured] = useState([])
  const dispatch = useLayoutDispatch();

  useEffect(() => {
    //fetch featured properties
    fetchFeatured();
    //show newsletter
    toggleNewsLetter(dispatch);
    return () => {
      //hide news letter
      toggleNewsLetter(dispatch); 
    };
    //eslint-disable-next-line
  }, []);

  const Carousel = withCarousel(Suggestion, featured);
  function displayElement() {
    if (error) return <h4>Error</h4>;
    if (loading) return <Spinner />;
    if (featured && !featured.length)
      return <h1>there are no featured properties yet</h1>;
    return <Carousel />;
  }
  return (
    <div>
      <div className="map_region">
        <Sidebar search={"my name"} open />
        <Map />
      </div>
      <div className="home_slide">
        <h4>Featured Properties</h4>
        <div className="slide_wrapper">{displayElement()}</div>
      </div>
    </div>
  );

 

  async function fetchFeatured(){
     try{
        setLoading(true);
        const response = await propertyService.getAllProperties();
        setLoading(false);
        setFeatured(response.data);
     }catch(err){
      setLoading(false);
      if(err.response){
        return setError(err.response.message)
      }else if(err.request){
        return setError("there appeaers to be a problem with your internet connection")
      }
      setError(err.message);
     }
  }
}

Home.propTypes = {};
