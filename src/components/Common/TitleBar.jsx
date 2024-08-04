import React from "react";
import PropTypes from "prop-types";

function TitleBar({ category }) {
  return (
    <div
      className="text-mainGray text-xl font-semibold px-6
        py-3 bg-white border-l-6 border-mainOrange uppercase"
    >
      <h2>{category?.name}</h2>
    </div>
  );
}
TitleBar.propTypes = {
  category: PropTypes.object,
};
export default TitleBar;
