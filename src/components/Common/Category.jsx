import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
function Category({ category, isNavBar, handleToggle }) {
  const styledLink = isNavBar
    ? "duration-500 hover:text-mainOrange hover:pl-3"
    : "";
  const styledLi = isNavBar ? "py-3 mr-3 border-b-1" : "";
  return (
    <li className={`${styledLi} first-letter:uppercase`}>
      <Link
        to={`/category/${category}`}
        className={styledLink}
        onClick={handleToggle}
      >
        {category.replace("-", " ")}
      </Link>
    </li>
  );
}
Category.propTypes = {
  category: PropTypes.node,
  isNavBar: PropTypes.bool,
  handleToggle: PropTypes.func,
};
export default Category;
