import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "./SideBar";
import { hideSideBar } from "../../store/home/menuSlice";
import CartBar from "./CartBar";

function ToggleLayout() {
  const dispatch = useDispatch();
  const { isShow } = useSelector((state) => state.cartBar);
  const { categories, categoryStatus } = useSelector((state) => state.category);
  const { cartItems } = useSelector((state) => state.cart);
  function handleToggle() {
    dispatch(hideSideBar());
  }

  return (
    <>
      <SideBar
        categories={categories}
        categoryStatus={categoryStatus}
        handleToggle={handleToggle}
      />
      <CartBar isShow={isShow} cartItems={cartItems} />
    </>
  );
}

export default ToggleLayout;
