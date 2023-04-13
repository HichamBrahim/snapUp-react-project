import React from "react";
import formatter from "../../utils/formatter";
import PropTypes from "prop-types";

function Item({ title, images, finalPrice }) {
  const img = images[0];
  return (
    <li className="flex items-center justify-between border-b-1 pb-2">
      <img className="w-12 h-12" src={img} alt={title} />
      <p className="text-sm">{title}</p>
      <span className="text-mainOrange">{`$${formatter(finalPrice)}`}</span>
    </li>
  );
}
Item.propTypes = {
  title: PropTypes.string,
  images: PropTypes.array,
  finalPrice: PropTypes.node,
};
export default Item;
