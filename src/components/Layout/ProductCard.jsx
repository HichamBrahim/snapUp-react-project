import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import formatter from "../../utils/formatter";
import PropTypes from "prop-types";
function ProductCard({
  id,
  title,
  price,
  discountPercentage,
  brand,
  category,
  images,
}) {
  const finalPrice = price - price * (discountPercentage / 100);
  const [img, setImg] = useState(images[0]);
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/product/${id}`)} className="cursor-pointer">
      <div
        className="product bg-white rounded-xl overflow-hidden max-w-300 mx-auto
      text-sm"
      >
        <div
          className="h-60 relative"
          onMouseEnter={() => setImg(images[1])}
          onMouseLeave={() => setImg(images[0])}
        >
          <img
            className="h-full max-h-full w-full object-cover"
            src={img}
            alt={title}
          />
          <span
            className="inline-block absolute left-0 top-4
            bg-mainOrange px-1 py-0.5 text-white"
          >
            {category}
          </span>
        </div>
        <div className="p-2 text-center space-y-2">
          <span className="opacity-90 border-b-1 border-[rgb(0,0,0,0.05)] pb-1 ">
            Brand: <span className="font-semibold">{brand}</span>
          </span>
          <p className="opacity-70">{title}</p>
          <div className="flex items-center justify-center space-x-2">
            <del className="text-xs opacity-60">{`$${formatter(price)}`}</del>
            <strong className="py-1 opacity-80 border-b-1 border-lightOrange font-semibold">
              {`$${formatter(finalPrice)}`}
            </strong>
            <span className="text-mainOrange ">{"(% Off)"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
ProductCard.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  price: PropTypes.number,
  discountPercentage: PropTypes.number,
  brand: PropTypes.string,
  category: PropTypes.string,
  images: PropTypes.array,
};

export default ProductCard;
