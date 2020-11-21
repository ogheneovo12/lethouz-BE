import React from "react";
//import PropTypes from 'prop-types'
import { Spinner } from "./Spinner";

function PageLoad({ message }) {
  return (
    <div class="pageLoader">
      <Spinner />
      <h3>{message}</h3>
    </div>
  );
}

PageLoad.propTypes = {};

export default PageLoad;
