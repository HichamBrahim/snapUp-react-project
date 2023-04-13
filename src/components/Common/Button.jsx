import React from "react";
import PropTypes from "prop-types";

function Button({ children, width }) {
  return (
    <button
      className={`block ${width} px-3 py-2 text-white bg-mainOrange rounded-lg`}
    >
      {children}
    </button>
  );
}
Button.propTypes = {
  width: PropTypes.string,
  children: PropTypes.node,
};
export default Button;
