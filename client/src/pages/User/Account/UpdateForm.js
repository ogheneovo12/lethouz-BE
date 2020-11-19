import React, { useState } from "react";
import cx from "classname";
import * as Yup from "yup";
import { password } from "../../../components/Auth/Schemas";
import { Spinner } from "../../../components";
import { changeUserPassword } from "../../../actions";
import { useUserDispatch, usePropertyDispatch } from "../../../contexts";
import { useFormik } from "formik";
//import PropTypes from 'prop-types'

function UpdateForm() {
  const [loading, setLoading] = useState(false);
  const propertyDispatch = usePropertyDispatch();
  // const [serverErrors, setServerErrors] = useState("");
  const dispatch = useUserDispatch();
  const { handleSubmit, getFieldProps, touched, errors, setErrors } = useFormik(
    {
      initialValues: {
        password: "",
        newPassword: "",
        confirmPassword: "",
      },
      validationSchema: Yup.object().shape({
        password,
        newPassword: password,
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
          .required("Password confirm is required"),
      }),
      onSubmit(values) {
       
        changeUserPassword(
          dispatch,
          values,
          setLoading,
          setErrors,
          propertyDispatch
        );
      },
    }
  );

  const getError = (field) => touched[field] && errors[field];

  return (
    <div style={{ marginTop: 20 }}>
      <form className="upform fadein" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="password">
            current password{" "}
            <span className="errorMessage">{getError("password")}</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            {...getFieldProps("password")}
            className={cx(!!getError("password") && "input-error")}
          />
        </div>
        <div className="form-control">
          <label htmlFor="newPassword">
            New password{" "}
            <span className="errorMessage">{getError("newPassword")}</span>
          </label>
          <input
            type="password"
            name="newPassword"
            {...getFieldProps("newPassword")}
            className={cx(!!getError("newPassword") && "input-error")}
          />
        </div>
        <div className="form-control">
          <label htmlFor="confirmPassword">
            Confirm password{" "}
            <span className="errorMessage">{getError("confirmPassword")}</span>
          </label>
          <input
            type="password"
            name="confirmPassword"
            {...getFieldProps("confirmPassword")}
            className={cx(!!getError("confirmPassword") && "input-error")}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {loading ? <Spinner /> : <span>Update Password</span>}
        </button>
      </form>
    </div>
  );
}

UpdateForm.propTypes = {};

export default UpdateForm;
