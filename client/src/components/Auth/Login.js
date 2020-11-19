import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useUserDispatch, loginUser, useUserState } from "../../contexts";
import { useFormik } from "formik";
import cx from "classname";
import { loginSchema } from "./Schemas";
import { Spinner } from "../../components";
import PropTypes from "prop-types";

export function DefaultLogin({ closeModal, openOptions }) {
  const userDispatch = useUserDispatch();
  const { isAuthenticated } = useUserState();
  const [loading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState("");
 
  const { handleSubmit, getFieldProps, touched, errors, setErrors } = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema: loginSchema,
    onSubmit(values) {
      loginUser(
        userDispatch,
        isAuthenticated,
        values.email,
        values.password,
        closeModal,
        setLoading,
        error2string
      );
    },
  });
  function error2string(e) {
    if (e instanceof Object && Object.keys(e).includes("request")) {
      if(e.request instanceof Object) return;
       return setServerErrors(e.request.split('/')[0]);
    }
    return setErrors(e);
  }
  const getError = (field) => touched[field] && errors[field];
  return (
    <div className="form-modal slideinleft">
      <div className="form-modal__header">
        <div className="close-con" onClick={closeModal}>
          <span className="close_icon"></span>
        </div>
        <span className="text">Login</span>
      </div>
      <form className="login" onSubmit={handleSubmit}>
        {serverErrors && <span className="error">{serverErrors}</span>}
        <div className="form-control">
          <label htmlFor="email">
            Username <span className="errorMessage">{getError("email")}</span>
          </label>
          <input
            type="text"
            name="email"
            {...getFieldProps("email")}
            className={cx(!!getError("email") && "input-error")}
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">
            Password{" "}
            <span className="errorMessage">{getError("password")}</span>
          </label>
          <input
            type="password"
            name="password"
            {...getFieldProps("password")}
            className={cx(!!getError("password") && "input-error")}
          />
        </div>
        <div className="forget">
          <span className="reset">
            <a href="/">forgotten your password</a>
          </span>
        </div>
        <div className="form-control">
          <button type="submit" className="btn btn-full btn-primary">
            {loading ? <Spinner /> : <span>Login</span>}
          </button>
        </div>
        <div className="moreops">
          <p onClick={() => openOptions("login")}>More Login option</p>
          <p className="ftnote">
            don't have an account?{" "}
            <span onClick={() => openOptions("signup")}>signup</span>
          </p>
        </div>
      </form>
    </div>
  );
}

DefaultLogin.propTypes = {
  closeModal: PropTypes.func,
  openOptions: PropTypes.func,
};

export const Login = withRouter(DefaultLogin);
