import React, { useState } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import cx from "classname";
import { regSchema } from "./Schemas";
import { useUserDispatch, register } from "../../contexts";
import { Spinner } from "../../components";
import { withRouter } from "react-router-dom";

function DefaultSignup({ closeModal, openOptions }) {
  const [loading, setLoading] = useState(false);
  const userDispatch = useUserDispatch();
  const { handleSubmit, getFieldProps, touched, errors, setErrors } = useFormik(
    {
      initialValues: {
        firstName: "",
        lastName: "",
        password: "",
        email: "",
        confirmPassword: "",
        tandc: false,
      },
      validationSchema: regSchema,
      onSubmit(values) {
        register(userDispatch, values, setLoading, setErrors, closeModal);
      },
    }
  );

  const getError = (field) => touched[field] && errors[field];
  return (
    <div className="form-modal slideinleft">
      <div className="form-modal__header">
        <div className="close-con" onClick={closeModal}>
          <span className="close_icon"></span>
        </div>
        <span className="text">Signup</span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="firstName">
            firstname{" "}
            <span className="errorMessage">{getError("firstName")}</span>
          </label>
          <input
            type="text"
            name="firstName"
            {...getFieldProps("firstName")}
            className={cx(!!getError("firstName") && "input-error")}
          />
        </div>
        <div className="form-control">
          <label htmlFor="lastName">
            lastName{" "}
            <span className="errorMessage">{getError("lastName")}</span>
          </label>
          <input
            type="text"
            name="lastName"
            className={cx(!!getError("lastName") && "input-error")}
            {...getFieldProps("lastName")}
          />
        </div>
        <div className="form-control">
          <label htmlFor="email">
            email <span className="errorMessage">{getError("email")}</span>
          </label>
          <input
            type="email"
            name="email"
            className={cx(!!getError("email") && "input-error")}
            {...getFieldProps("email")}
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">
            password{" "}
            <span className="errorMessage">{getError("password")}</span>
          </label>
          <input
            type="password"
            name="password"
            {...getFieldProps("password")}
            className={cx(!!getError("password") && "input-error")}
          />
        </div>
        <div className="form-control">
          <label htmlFor="confirmPassword">
            confirm password{" "}
            <span className="errorMessage">{getError("confirmPassword")}</span>
          </label>
          <input
            type="password"
            name="confirmPassword"
            {...getFieldProps("confirmPassword")}
            className={cx(!!getError("confirmPassword") && "input-error")}
          />
        </div>
        <div className="tc">
          <input
            type="checkbox"
            name="tandc"
            {...getFieldProps("tandc")}
            className={cx(!!getError("tandc") && "input-error")}
          />
          <p>
            I agree to lethouz’s Terms of Service, Payments Terms of Service,
            Privacy Policy, and Nondiscrimination Policy.{" "}
          </p>
        </div>
        <div className="form-control">
          <button type="submit" className="btn btn-full btn-primary">
            {loading ? <Spinner /> : <span>Sign up</span>}
          </button>
        </div>
        <div className="moreops">
          <p onClick={() => openOptions("signup")}>More Signup option</p>
          <p className="ftnote">
            Already have an account?{" "}
            <span onClick={() => openOptions("login")}>Login</span>
          </p>
        </div>
      </form>
    </div>
  );
}

DefaultSignup.propTypes = {
  closeModal: PropTypes.func,
  openOptions: PropTypes.func,
};

export const Signup = withRouter(DefaultSignup);
