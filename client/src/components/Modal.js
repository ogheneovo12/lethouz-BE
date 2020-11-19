import React from "react";
import PropTypes from "prop-types";
import cx from "classname";
export function Modal({
  show,
  closeModal,
  children,
  showcancel,
  form,
  center,
}) {
  return (
    <>
      {show ? <div className="Backdrop" onClick={closeModal}></div> : null}
      <div
        className={cx("dialogue", form && "form", center && "center")}
        style={{
          transform: show ? `translateY(${center ?"20%": "0"})` : "translateY(-2000px)",
        }}
      >
        {showcancel && (
          <h2
            onClick={closeModal}
            className="modal-close"
            style={{ color: "#fff" }}
          >
            <i className="fa fa-times"></i>
          </h2>
        )}
        {children}
      </div>
    </>
  );
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  closeModal: PropTypes.func,
};
