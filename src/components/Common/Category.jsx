import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
function Category({ item, isNavBar, handleToggle }) {
  const styledLink = isNavBar
    ? "duration-500 hover:text-mainOrange hover:pl-3"
    : "";
  const styledLi = isNavBar ? "py-3 mr-3 border-b-1" : "";
  return (
    <li className={`${styledLi} first-letter:uppercase`}>
      <Link
        to={`/category/${item?.name}`}
        className={styledLink}
        onClick={handleToggle}
      >
        {item?.name}
      </Link>
    </li>
  );
}
Category.propTypes = {
  item: PropTypes.object,
  isNavBar: PropTypes.bool,
  handleToggle: PropTypes.func,
};
export default Category;
