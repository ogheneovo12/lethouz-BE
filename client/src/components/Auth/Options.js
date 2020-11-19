import React, { useState, useEffect, useRef } from "react";
import { Signup, Login } from "../index";
import propTypes from "prop-types";
import { USER_API_BASEURL } from "../../constants";
import AuthErrorBoundary from "./AuthErrorBoundary"
/**
 *
 * @param {instance} param0
 * this component is for dynamically setting auth options(email, google, facebook) user intends  to use for app,
 * instance is used to tell the component what the option should be applied to, login or sign up.
 */
export function AuthOptions({ instance, closeModal }) {
  const [internalFormState, setInternal] = useState(instance);
  const [isChangedState, setIsChangedState] = useState(false);
  const [showWithEmail, setWithEmail] = useState(false);
  const FormOptionDom = useRef(null);
  const animationClass = "slideinleft";
  const toggleWithEmail = () => setWithEmail(!showWithEmail);
  const backtoOptions = (instance) => {
    setInternal(instance);
    toggleWithEmail();
  };
  const instanceProps = {
    closeModal: closeModal ? closeModal : void 0,
    openOptions: backtoOptions,
  };
  function getformWithEmail() {
    if (internalFormState === "signup") return <Signup {...instanceProps} />;
    if (internalFormState === "login") return <Login {...instanceProps} />;
  }

  const switchInstance = (instance) => {
    FormOptionDom.current.classList.remove(animationClass);
    setIsChangedState(!isChangedState);
    //to keep form state in sync with css animation
    setTimeout(() => setInternal(instance), 100);
  };

  useEffect(() => {
    //slidein form from left
    FormOptionDom.current.classList.add(animationClass);
  }, [isChangedState]);

  //generate footnote depending on the chosen form instance
  const getfootnote = () => {
    if (internalFormState === "signup") {
      return (
        <p className="ftnote">
          Already have an account?{" "}
          <span onClick={() => switchInstance("login")}>Login</span>
        </p>
      );
    }
    if (internalFormState === "login") {
      return (
        <p className="ftnote">
          Don't have an account yet?{" "}
          <span onClick={() => switchInstance("signup")}>Signup here</span>
        </p>
      );
    }
  };

  return (
    <AuthErrorBoundary closeModal={closeModal}>
      {showWithEmail ? (
        getformWithEmail()
      ) : (
        <div className="form-modal" ref={FormOptionDom}>
          <div className="form-modal__header">
            <div
              className="close-con"
              onClick={closeModal ? closeModal : void 0}
            >
              <span className="close_icon"></span>
            </div>
            <span className="text">{internalFormState.toUpperCase()}</span>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <button className="input-icon-btn" onClick={toggleWithEmail}>
              <i className="fa fa-envelope"></i>{" "}
              <span>Continue with Email</span>
            </button>
            <div className="horizontal-container">
              <span className="horizontal"></span>
              <small>or</small>
              <span className="horizontal"></span>
            </div>
            <div className="other-options">
              <a
                href={`${USER_API_BASEURL}auth/google`}
                className="input-icon-btn"
              >
                <i className="fab fa-google"></i>{" "}
                <span>Continue with google</span>
              </a>

              <a
                href={`${USER_API_BASEURL}auth/facebook`}
                className="input-icon-btn"
              >
                <i className="fab fa-facebook"></i>
                <span>Continue with facebook</span>
              </a>

              <button className="input-icon-btn">
                <i className="fab fa-twitter"></i>
                <span>Continue with twitter</span>
              </button>
              {getfootnote()}
            </div>
          </form>
        </div>
      )}
    </AuthErrorBoundary>
  );
}

AuthOptions.defaultProps = {
  instance: "signup",
};
AuthOptions.propTypes = {
  instance: propTypes.string,
  closeModal: propTypes.func,
};
