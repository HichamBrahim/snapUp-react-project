import React from "react";
import PropTypes from "prop-types";

function TitleBar({ category }) {
  return (
    <div
      className="text-mainGray text-xl font-semibold px-6
        py-3 bg-white border-l-6 border-mainOrange uppercase"
    >
      <h2>{category}</h2>
    </div>
  );
}
TitleBar.propTypes = {
  category: PropTypes.node,
};
TitleBar.defaultProps = {
  category: "",
};
export default TitleBar;
