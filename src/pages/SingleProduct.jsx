import React, { useEffect } from "react";
import { fetchSingleProduct } from "../store/products/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { STATUS } from "../utils/status";
import { useParams } from "react-router-dom";
import ProductDetails from "../components/Layout/ProductDetails";
import Loader from "../components/Common/Loader";
import ToggleLayout from "../components/Layout/ToggleLayout";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function SingleProduct() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singleProduct, singleProductStatus } = useSelector(
    (state) => state.product
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (productId <= 100 && productId > 0) {
      dispatch(fetchSingleProduct(productId));
    } else {
      navigate("/not-found");
    }
  }, [productId, dispatch]);

  return (
    <main>
      <Helmet>
        <title>{`${
          singleProduct.title ? singleProduct.title : "loading..."
        } - Buy Online at SnapUp`}</title>
        <link rel="icon" type="image/png" href="icon.jpg" sizes="32x32" />
        <meta
          name="description"
          content="Discover snapUp, your ultimate online shopping destination. Our single-page website offers a wide range of high-quality products, from electronics and fragrances to groceries, home decor, furniture, and more. With fast shipping and secure checkout, snapUp makes shopping easy and hassle-free. Browse our selection and start shopping today!"
        />
      </Helmet>
      <section className="bg-WhiteSmoke min-h-75">
        <div className="container p-4 mx-auto">
          <ToggleLayout />
          {singleProductStatus === STATUS.SUCCEEDED ? (
            <ProductDetails {...singleProduct} />
          ) : (
            <Loader />
          )}
        </div>
      </section>
    </main>
  );
}

export default SingleProduct;
