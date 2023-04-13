import React from "react";
import formatter from "../../utils/formatter";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import {
  increaseItemCart,
  decreaseItemCart,
  removeItem,
} from "../../store/cart/cartSlice";
function CartItem({ id, title, idx, amount, finalPrice }) {
  const dispatch = useDispatch();
  let totalQtyPrice = finalPrice * amount;
  return (
    <li
      className="flex flex-col items-center text-15 opacity-90
            px-4 py-6 rounded-sm border-b-1 space-y-2 md:flex-row md:space-y-0"
    >
      <div className="w-fit md:w-24">{idx + 1}</div>
      <div className="w-fit md:w-96">{title}</div>
      <div className="w-fit md:w-52">{`$${formatter(finalPrice)}`}</div>
      <div className="w-fit md:w-52">
        <div className="flex w-20 items-center border-1">
          <button
            className=" w-6 border-r-1"
            onClick={() => dispatch(decreaseItemCart(id))}
          >
            <i className="fa-solid fa-minus"></i>
          </button>
          <span className="text-lg w-8 text-center">{amount}</span>
          <button
            className="w-6 border-l-1"
            onClick={() => dispatch(increaseItemCart(id))}
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
      <div className="w-fit md:w-52 text-mainOrange pl-0 md:pl-6">
        {`$${formatter(totalQtyPrice)}`}
      </div>
      <div className="w-fit md:w-52">
        <span
          className="duration-300 cursor-pointer hover:text-mainOrange"
          onClick={() => dispatch(removeItem(id))}
        >
          Delete
        </span>
      </div>
    </li>
  );
}
CartItem.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  idx: PropTypes.number,
  amount: PropTypes.number,
  finalPrice: PropTypes.number,
};
export default CartItem;
