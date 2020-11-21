import React from "react";
import PropTypes from "prop-types";
import { InfoBox } from "@react-google-maps/api";
import { Tooltip, Modal } from "../index";
import { infoBoxOptions } from "../../constants/map.constant";
import { isMobile } from "../../helpers";

function PropertyBox({ selected, onClose }) {
  const [lng,lat] = selected.geometry.coordinates;
  if (isMobile()) {
    return (
      <Modal center show={!!selected} closeModal={onClose}>
        <Tooltip {...selected} onClose={onClose} />
      </Modal>
    );
  }
  return (
    <InfoBox
      position={{ lat: +lat, lng: +lng }}
      options={infoBoxOptions}
      onCloseClick={onClose}
    >
      <Tooltip {...selected} onClose={onClose} />
    </InfoBox>
  );
}

PropertyBox.propTypes = {
  selected: PropTypes.object,
};

export default PropertyBox;
