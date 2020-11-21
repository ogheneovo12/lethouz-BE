import React from "react";
//import PropTypes from 'prop-types'
import { Spinner } from "..";
import UploadedItem from "./UploadedItem";

export function UploadedUI({ limit, uploaded, loading, error, isGuest}) {
  function displayElement() {
    if (error) return <h4>Error</h4>;
    if (loading) return <Spinner />;
    if (!uploaded) return <h1>couldnt get properties</h1>;
    if (!uploaded.length) return <h3>you haven't uploaded any property</h3>;
    if (limit) {
      uploaded.splice(limit);
    }
    return (
      <div className="uploaded_item_wrapper">
        {uploaded.map((property) => (
          <UploadedItem key={property._id} {...property} isGuest={isGuest} />
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

UploadedUI.propTypes = {};
