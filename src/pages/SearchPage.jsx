import React, { useEffect } from "react";
import ToggleLayout from "../components/Layout/ToggleLayout";
import ProductList from "../components/Layout/ProductList";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { STATUS } from "../utils/status";
import { fetchSearchProduct } from "../store/products/searchSlice";
import Loader from "../components/Common/Loader";
import TitleBar from "../components/Common/TitleBar";
import { Helmet } from "react-helmet-async";

function SearchPage() {
  const { searchId } = useParams();
  const dispatch = useDispatch();
  const { searchProduct, searchStatus } = useSelector((state) => state.search);
  useEffect(() => {
    dispatch(fetchSearchProduct(searchId));
  }, [searchId]);
  return (
    <main className="main">
      <Helmet>
        <title>{`Search Results for "${searchId}" - SnapUp`}</title>
        <link rel="icon" type="image/png" href="icon.jpg" sizes="32x32" />
      </Helmet>
      <ToggleLayout />
      <section className="py-8 bg-WhiteSmoke min-h-75">
        <div className="container mx-auto p-4">
          {searchStatus === STATUS.LOADING ? (
            <Loader />
          ) : searchProduct.length > 0 ? (
            <>
              <TitleBar category={"search products"} />
              <ProductList products={searchProduct} />
            </>
          ) : (
            <div className="text-mainOrange text-2xl text-center font-medium">
              No Products Found.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default SearchPage;
