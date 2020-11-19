import React, { useState } from "react";

export function Slider({ value, min, max, onChange, ...rest }) {
  const [showInput, setShowInput] = useState(false);
  return (
    <div className="slide_container">
      <label htmlFor=""></label>
      <div className="withupdate">
        {!showInput ? (
          <p onClick={() => setShowInput(true)}>{value}</p>
        ) : (
          <input
            type="number"
            defaultValue={value}
            onChange={onChange}
            onBlur={() => setShowInput(false)}
          />
        )}
      </div>
      <div className="minmax">
        {" "}
        <span>${min}</span> <span>${max}</span>
      </div>
      <input
        type="range"
        max={max}
        min={min}
        value={value}
        onChange={onChange}
        className="slider"
        {...rest}
      />
    </div>
  );
}

Slider.defaultProps = {
  value: 10,
  min: 0,
  max: 100,
  onChange: void 0,
};
Slider.propTypes = {};

export function withPreview() {}
