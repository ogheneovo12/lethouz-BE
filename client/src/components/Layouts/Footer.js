import React from "react";
import { NewsLetter } from "../NewsLetter";
import { useLayoutState } from "../../contexts";
//import PropTypes from 'prop-types'

export function Footer(props) {
  const { showNewsLetter } = useLayoutState();
  return (
    <>
      {showNewsLetter && <NewsLetter />}
      <footer>
        <div className="info">
          <div className="info__logo">
            <img src="/img/Group.svg" alt="logo" />
          </div>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint nulla
            aut maxime repudiandae amet facere esse dolorem, delectus soluta
            unde.
          </p>
          <span className="social">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-twitter"></i>
          </span>
        </div>
        <nav className="nav">
          <ul>
            <li>connect with us at</li>
            <li>
              <i className="fab fa-facebook"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-instagram"></i>
            
            </li>
          </ul>
          <ul>
            <li>location</li>
            <li>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. .</li>
            </ul>
        </nav>
      </footer>
    </>
  );
}

Footer.propTypes = {};
