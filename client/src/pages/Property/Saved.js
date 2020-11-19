import React, { useEffect } from "react";
//import PropTypes from 'prop-types'
import { Spinner, Suggestion } from "../../components";
import {
  usePropertyDispatch,
  usePropertyState,
  getSaved,
} from "../../contexts";
function Saved(props) {
  const { loading, error, saved } = usePropertyState();
  const propertyDispatch = usePropertyDispatch();
  useEffect(() => {
    getSaved(propertyDispatch);
    // eslint-disable-next-line
  }, []);

  function displayElement() {
    if (error) return <h4>Error</h4>;
    if (loading) return <Spinner />;
    if (!saved) return <h1>couldnt get properties</h1>;
    if (!saved.length) return <h3>you dont have any svaed property yet</h3>;
    if (props.limit) {
      saved.splice(props.limit);
    }

    return (
      <div className="uploaded_item_wrapper">
        {saved.map((property) => (
          <Suggestion key={property._id} {...property} />
        ))}
      </div>
    );
  }

  return (
    <div className="saved" style={{ paddingTop: 50 }}>
      {displayElement()}
    </div>
  );
}

Saved.propTypes = {};

export default Saved;
