import React from "react";
import { Link } from "react-router-dom";
import Item from "../Common/Item";
import Button from "../Common/Button";
import shopping from "../../assets/shopping_cart.png";
import { useAuth } from "../../custom-hook/useAuth";
import PropTypes from "prop-types";

function CartBar({ isShow, cartItems }) {
  const style = isShow ? "block" : "hidden";
  const { login } = useAuth();
  const fixSpacing = login ? "top-152" : "top-120";
  return (
    <section className={`duration-700 ${style}`}>
      <Link
        to={"/cart"}
        className={`cartItems absolute z-10 h-450 w-72 border-2 ${fixSpacing}
        p-6 text-center bg-white rounded-lg overflow-y-scroll right-4 sm:right-12 sm:w-96`}
      >
        <p>Recently Added Products</p>
        {cartItems.length > 0 ? (
          <div>
            <ul className=" mt-3 space-y-3">
              {cartItems.map((cartItem) => {
                return <Item key={cartItem.id} {...cartItem} />;
              })}
            </ul>
            <div className="text-sm mt-3">
              <Button width="w-fit">View My Shopping Cart</Button>
            </div>
          </div>
        ) : (
          <ul className=" space-y-4">
            <li className="w-32 mx-auto">
              <img className="max-w-full" src={shopping} alt="no products" />
            </li>
            <li>No Products Yet</li>
          </ul>
        )}
      </Link>
    </section>
  );
}
CartBar.propTypes = {
  isShow: PropTypes.bool,
  cartItems: PropTypes.array,
};
export default CartBar;
