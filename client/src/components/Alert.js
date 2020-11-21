import React, { useEffect, useRef } from "react";
import cx from "classname";
import PropTypes from "prop-types";

export function Alert({ type, message, pos, close, selfdestroy, property }) {
  const timerId = useRef();
  useEffect(() => {
    if (selfdestroy) {
      timerId.current = setTimeout(close, 5000);
    }
    return () => {
      clearTimeout(timerId.current);
    };
    //eslint-disable-next-line
  }, []);
  const schema = {
    success: "success",
    error: "error",
    warning: "warning",
  };
  const posit = {
    bl: "bl",
    tr: "tr",
  };
  if (property) {
    return (
      <div className={cx("property-error", message && "show", schema[type])}>
        <p>{message}</p>
      </div>
    );
  }
  return (
    <div className={cx("alert", schema[type], posit[pos])}>
      <p>{message}</p>
      <span className="delete" onClick={close}>
        <i className="fa fa-times"></i>
      </span>
    </div>
  );
}

Alert.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
  pos: PropTypes.string,
  close: PropTypes.func,
};
Alert.defaultProps = {
  type: "",
  message: "This is default Alert",
  pos: "",
  close: void 0,
  selfdestroy: true,
};
