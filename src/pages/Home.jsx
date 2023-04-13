import React, { useEffect } from "react";
import MainSlider from "../components/Layout/MainSlider";
import ProductList from "../components/Layout/ProductList";
import ToggleLayout from "../components/Layout/ToggleLayout";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../store/products/productSlice";
import { STATUS } from "../utils/status";
import TitleBar from "../components/Common/TitleBar";
import shuffle from "../utils/shuffle";
import Loader from "../components/Common/Loader";
import { Helmet } from "react-helmet-async";

function Home() {
  const { products, productStatus } = useSelector((state) => state.product);
  const { categories, categoryStatus } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  useEffect(() => {
    if (productStatus === STATUS.IDLE) {
      dispatch(fetchAllProducts(50));
    }
  }, [productStatus, dispatch]);

  let catProductsOne = [];
  let catProductsTwo = [];
  let catProductsThree = [];
  let catProductsFour = [];
  if (
    productStatus === STATUS.SUCCEEDED &&
    categoryStatus === STATUS.SUCCEEDED
  ) {
    catProductsOne = products.filter(
      (product) => product.category === categories[0]
    );
    catProductsTwo = products.filter(
      (product) => product.category === categories[1]
    );
    catProductsThree = products.filter(
      (product) => product.category === categories[2]
    );
    catProductsFour = products.filter(
      (product) => product.category === categories[3]
    );
  }
  const shuffleProducts = shuffle([...products]);
  return (
    <main className="main">
      <Helmet>
        <title>SnapUp - Your One-Stop Shop for Online Shopping</title>
      </Helmet>
      <ToggleLayout />
      <MainSlider />
      <section className="bg-WhiteSmoke py-8 mt-2">
        <div className="container p-4 mx-auto">
          <section className="pt-8">
            <TitleBar category={"see our products"} />
            {productStatus === STATUS.SUCCEEDED ? (
              <ProductList products={shuffleProducts} />
            ) : (
              <Loader />
            )}
          </section>
          <section className="pt-8">
            <TitleBar category={categories[0]} />
            {productStatus === STATUS.SUCCEEDED ? (
              <ProductList products={catProductsOne} />
            ) : (
              <Loader />
            )}
          </section>
          <section className="pt-8">
            <TitleBar category={categories[1]} />
            {productStatus === STATUS.SUCCEEDED ? (
              <ProductList products={catProductsTwo} />
            ) : (
              <Loader />
            )}
          </section>
          <section className="pt-8">
            <TitleBar category={categories[2]} />
            {productStatus === STATUS.SUCCEEDED ? (
              <ProductList products={catProductsThree} />
            ) : (
              <Loader />
            )}
          </section>
          <section className="pt-8">
            <TitleBar category={categories[3]} />
            {productStatus === STATUS.SUCCEEDED ? (
              <ProductList products={catProductsFour} />
            ) : (
              <Loader />
            )}
          </section>
        </div>
      </section>
    </main>
  );
}

export default Home;
