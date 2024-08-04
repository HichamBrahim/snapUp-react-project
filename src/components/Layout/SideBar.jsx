import React from "react";
import Category from "../Common/Category";
import { useSelector } from "react-redux";
import { STATUS } from "../../utils/status";
import PropTypes from "prop-types";
function SideBar({ categories, categoryStatus, handleToggle }) {
  const { isShow } = useSelector((state) => state.menu);
  let content = "";
  if (categoryStatus === STATUS.LOADING) {
    content = "";
  } else if (categoryStatus === STATUS.SUCCEEDED) {
    content = categories.map((category) => {
      return (
        <Category
          key={category?.name}
          item={category}
          isNavBar={true}
          handleToggle={handleToggle}
        />
      );
    });
  }
  const style = isShow ? "left-0" : "-left-350";
  return (
    <aside
      className={`${style} fixed duration-500 top-0 bg-white p-6 min-w-300 z-10`}
    >
      <div className="flex items-center justify-between text-xl">
        <h2 className="font-medium uppercase">all categories</h2>
        <i
          className="cursor-pointer hover:text-mainOrange duration-300 fa-solid fa-xmark"
          onClick={handleToggle}
        ></i>
      </div>
      <nav>
        <ul className="aside--cate flex flex-col mt-4 text-sm opacity-90 h-screen overflow-scroll">
          {content}
        </ul>
      </nav>
    </aside>
  );
}
SideBar.propTypes = {
  categories: PropTypes.array,
  categoryStatus: PropTypes.string,
  handleToggle: PropTypes.func,
};
export default SideBar;
