import React, { useState } from "react";
import { Link } from "react-router-dom";
import { STATUS } from "../../utils/status";
import Category from "../Common/Category";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
function SearchBar({
  categories,
  categoryStatus,
  handleToggleSideBar,
  handleToggleCart,
  numberProductInCart,
}) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  function handleChange(e) {
    setSearch(e.target.value);
  }
  function handleSearch(e) {
    e.preventDefault();
    if (search !== "") {
      navigate(`/search/${search}`);
    }
  }
  let content = "";
  if (categoryStatus === STATUS.LOADING) {
    content = "";
  } else if (categoryStatus === STATUS.SUCCEEDED) {
    content = categories.slice(0, 8).map((category) => {
      return <Category key={category} category={category} />;
    });
  }

  return (
    <div className="flex items-center space-x-10 py-3">
      <div className="flex items-center space-x-3 text-xl">
        <i
          className="cursor-pointer fa-solid fa-bars"
          onClick={handleToggleSideBar}
        ></i>
        <i className="cursor-pointer fa-solid fa-bag-shopping"></i>
        <Link to={"/"}>
          <h1 className="font-bold text-2xl">
            Snap<span className="font-normal">Up.</span>
          </h1>
        </Link>
      </div>
      <div className="flex flex-col flex-1 space-y-2">
        <form className="hidden justify-between items-center p-1 h-10 rounded bg-white sm:flex">
          <input
            type="text"
            placeholder="Search your prefered item here"
            className="w-full px-4 caret-mainOrange text-sm 
              font-normal border-none outline-none text-13 text-black"
            name="search"
            onChange={handleChange}
            value={search}
          />
          <button
            type="submit"
            className=" h-full w-14 bg-mainOrange
                flex items-center justify-center"
            onClick={handleSearch}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
        <ul className="hidden items-center space-x-3 text-xs lg:flex">
          {content}
        </ul>
      </div>
      <div
        className="relative text-xl cursor-pointer"
        onClick={handleToggleCart}
      >
        <i className="fa-solid fa-cart-shopping"></i>
        <span
          className="inline-block absolute text-sm text-center w-5 h-5 rounded-full
            bg-white text-mainOrange -top-3 -right-2"
        >
          {numberProductInCart}
        </span>
      </div>
    </div>
  );
}
SearchBar.propTypes = {
  categories: PropTypes.array,
  categoryStatus: PropTypes.string,
  handleToggleSideBar: PropTypes.func,
  handleToggleCart: PropTypes.func,
  numberProductInCart: PropTypes.number,
};

export default SearchBar;
