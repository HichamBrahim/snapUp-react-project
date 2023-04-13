import React from "react";
import Product from "./Product";
import PropTypes from "prop-types";

function ProductList({ products }) {
  return (
    <div className="product--list grid gap-x-3 gap-y-5 mt-4">
      {React.Children.toArray(
        products.map((product) => <Product {...product} />)
      )}
    </div>
  );
}
ProductList.propTypes = {
  products: PropTypes.array,
};
export default ProductList;
