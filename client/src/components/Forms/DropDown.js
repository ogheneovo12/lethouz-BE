import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import cx from "classname";
export function DropDown({
  value,
  name,
  data,
  onChange,
  block,
  title,
  type,
  ghost,
  scroll,
  isInvalid,
  placeholder,
  defaultMessage
}) {
  const [isDropDownOpened, setIsDropDownOpened] = useState(false);
  const toggleDropDown = () => {
    setIsDropDownOpened(!isDropDownOpened);
  };
  const handleOnClickOutside = useCallback((ev)=>{
     ev.stopPropagation();
     if(!ev.target.matches(".dropdownWrapper")){
        if(isDropDownOpened)setIsDropDownOpened(false);
     }
  },[isDropDownOpened]);
  useEffect(()=>{
    window.addEventListener("click",handleOnClickOutside)
    return ()=>{
      window.removeEventListener("click",handleOnClickOutside)
    }
  },[handleOnClickOutside])
  const types = {
    medium: "md", //for smaller width
    large: "full", //for larger width style
  };
  const defaultType = types["medium"];
  return (
    <div
      className={cx(
        `dropdownWrapper`,
        block ? "block" : "",
        types[type] || defaultType
      )}
    >
      {title && <label>{title}</label>}
      <div
        className={cx(
          "custom-dropdown",
          ghost && "ghost",
          isInvalid && "invalid"
        )}
        onClick={toggleDropDown}
      >
        {isDropDownOpened && (
          <ul
            className={cx(
              "dropDownOption",
              "full",
              scroll && "scroll"
            )}
          >
            {data && (!data.length ? <DropDownItem onChange={toggleDropDown}>{defaultMessage}</DropDownItem>:
              data.map(({ value, label }, index) => (
                <DropDownItem
                  key={`Menu ${index}`}
                  onClick={
                    onChange
                      ? () => {
                          onChange({ name, value, label });
                          toggleDropDown()
                        }
                      : void 0
                  }
                >
                  {label}
                </DropDownItem>
              )))}
          </ul>
        )}
        <p>
          {value || placeholder}{" "}
          <span className="caret">
            <i className="fa fa-chevron-down"></i>
          </span>
        </p>
      </div>
    </div>
  );
}

function DropDownItem({ onClick, children }) {
  return <li onClick={onClick}>{children}</li>;
}
DropDown.defaultProps = {
  isInvalid: false,
  placeholder:"--select--"
};
DropDown.propTypes = {
  value: PropTypes.string, //to dispaly value
  data: PropTypes.array, //to options to pick from
  onChange: PropTypes.func, //to handler for selection
  title: PropTypes.string, //to show a label at the top
  block: PropTypes.bool, //to overide the inline-block flow
  ghost: PropTypes.bool, //for transparent background
  scroll: PropTypes.bool, //to prevent the menu from growing when data is large
  type: PropTypes.string, //switch betwwen large or small size, this also affects the dropdown menu
  isInvalid: PropTypes.bool, // for ux experience
  defaultMessage:PropTypes.string //messgae to displayed when there is no data
};
