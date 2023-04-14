import React from "react";
import ProductCard from "./ProductCard";
import PropTypes from "prop-types";

function ProductsList({ products }) {
  return (
    <div className="product--list grid gap-x-3 gap-y-5 mt-4">
      {React.Children.toArray(
        products.map((product) => <ProductCard {...product} />)
      )}
    </div>
  );
}
ProductsList.propTypes = {
  products: PropTypes.array,
};
export default ProductsList;
