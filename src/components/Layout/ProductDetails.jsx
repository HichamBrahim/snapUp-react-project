import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cart/cartSlice";
import formatter from "../../utils/formatter";
import Button from "../Common/Button";
import { openCartBar } from "../../store/home/cartBarSlice";
import "react-toastify/dist/ReactToastify.css";

function ProductDetails(product) {
  const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    brand,
    category,
    stock,
    images,
  } = product;

  const dispatch = useDispatch();
  const [productCount, setProductCount] = useState(1);
  const [mainImage, setMainImage] = useState("");
  let finalPrice = price - price * (discountPercentage / 100);
  function handleAddedToCart(event) {
    event.stopPropagation();
    dispatch(
      addToCart({
        product: {
          ...product,
          amount: productCount,
          finalPrice,
        },
        productCount,
      })
    );
    dispatch(openCartBar());
  }
  function increase() {
    if (productCount < stock) {
      setProductCount((count) => (count += 1));
    }
  }
  function decrease() {
    if (productCount > 1) {
      setProductCount((count) => (count -= 1));
    }
  }
  function selectImage(img) {
    setMainImage(img);
  }

  return (
    <section className="bg-white p-4 flex flex-col my-8 md:flex-row md:space-x-10">
      <div className="md:w-1/2">
        <div className="h-96">
          <img
            className="max-h-full h-full w-full object-cover"
            src={mainImage ? mainImage : images[0]}
            alt={title}
          />
        </div>
        <ul className="images flex space-x-3 pt-3">
          {images.map((img, idx) => {
            return (
              <li
                key={idx}
                className="group w-24 h-24 duration-300 hover:border-2
                                                hover:border-mainOrange cursor-pointer"
                onClick={() => selectImage(img)}
              >
                <img
                  className="w-full h-full object-cover  duration-300 group-hover:scale-90"
                  src={img}
                  alt={title}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <div className="text-sm pt-4 md:w-1/2">
        <h2 className="text-lg font-medium">{title}</h2>
        <hr className="my-3" />
        <p className="opacity-70">{description}</p>
        <ul className="flex space-x-6 pt-3">
          <li>
            <span className="text-mainOrange">Rating:</span>{" "}
            <span>{rating}</span>
          </li>
          <li>
            <span className="text-mainOrange">Brand:</span> <span>{brand}</span>
          </li>
          <li>
            <span className="text-mainOrange">Category:</span>{" "}
            <span>{category.replace("-", " ")}</span>
          </li>
        </ul>
        <div className="p-6 bg-backGray mt-4">
          <div className="flex items-center space-x-3">
            <del className="inline-block text-lg opacity-50">
              {`$${formatter(price * productCount)}`}
            </del>
            <p>Inclusive of all taxes</p>
          </div>
          <div className="flex items-center space-x-2 pt-2">
            <strong className="text-2xl text-mainOrange font-medium">
              {`$${formatter(finalPrice * productCount)}`}
            </strong>
            <span
              className="inline-block bg-mainOrange text-white
                            px-2 font-semibold rounded-sm"
            >
              {`${discountPercentage}% OFF`}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-4 mt-6">
          <span className="text-16">Quantity:</span>
          <div className="flex w-20 items-center border-1">
            <button className=" w-6 border-r-1" onClick={decrease}>
              <i className="fa-solid fa-minus"></i>
            </button>
            <span className="text-lg w-8 text-center">{productCount}</span>
            <button className="w-6 border-l-1" onClick={increase}>
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
        <div className="flex space-x-3 mt-6">
          <button
            className="flex p-3 px-6 items-center
                            bg-btnClr border-1 border-mainOrange text-mainOrange space-x-2"
            onClick={handleAddedToCart}
          >
            <i className="fa-solid fa-cart-shopping"></i>
            <span>Add To Cart</span>
          </button>
          <Button width="w-32">Buy Now</Button>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
