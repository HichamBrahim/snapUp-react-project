import React, { useEffect } from "react";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { showSideBar } from "../../store/home/menuSlice";
import { toggleCartBar } from "../../store/home/cartBarSlice";
import { fetchAllCategories } from "../../store/products/categorySlice";
import { STATUS } from "../../utils/status";
import { useAuth } from "../../custom-hook/useAuth";
function Header() {
  const dispatch = useDispatch();
  const { categories, categoryStatus } = useSelector((state) => state.category);
  const { numberProductInCart } = useSelector((state) => state.cart);
  const {login} = useAuth()
  useEffect(() => {
    if (categoryStatus === STATUS.IDLE) {
      dispatch(fetchAllCategories());
    }
  }, [categoryStatus, dispatch]);

  function handleToggleSideBar() {
    dispatch(showSideBar());
  }
  function handleToggleCart(event) {
    event.stopPropagation();
    dispatch(toggleCartBar())
  }
  const fixHeight = login ? 'h-161' : 'h-132'
  return (
    <header className={`bg-mainOrange text-white ${fixHeight}`}>
    <div className="container mx-auto px-4">
        <NavBar />
        <SearchBar
          categories={categories}
          categoryStatus={categoryStatus}
          handleToggleSideBar={handleToggleSideBar}
          handleToggleCart= {handleToggleCart}
          numberProductInCart={numberProductInCart}
        />
      </div>
    </header>
  );
}

export default Header;
