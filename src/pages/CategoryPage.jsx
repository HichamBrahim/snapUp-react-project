import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../components/Common/Loader";
import TitleBar from "../components/Common/TitleBar";
import ProductsList from "../components/Layout/ProductsList";
import ToggleLayout from "../components/Layout/ToggleLayout";
import { fetchProductsByCategory } from "../store/products/categorySlice";
import { STATUS } from "../utils/status";
import { Helmet } from "react-helmet-async";

function CategoryPage() {
  const { category } = useParams();
  const dispatch = useDispatch();
  const { poductsByCategory, cateProductsStatus } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    dispatch(fetchProductsByCategory(category));
  }, [dispatch, category]);
  return (
    <main>
      <Helmet>
        <title>{`SnapUp - Buy the Latest ${category} Online`}</title>
        <link rel="icon" type="image/png" href="icon.jpg" sizes="32x32" />
      </Helmet>
      <ToggleLayout />
      <section className="py-8 bg-WhiteSmoke min-h-75">
        <div className="container mx-auto p-4">
          <TitleBar category={{
            name: category
            }} />
          {cateProductsStatus === STATUS.SUCCEEDED ? 
            poductsByCategory?.length > 0 ? 
            <ProductsList products={poductsByCategory} /> :
            <div className="text-center mt-20">
              <h2 className="text-3xl font-bold text-mainOrange">No Products Found</h2>
            </div>
           : (
            <Loader />
          )}
        </div>
      </section>
    </main>
  );
}

export default CategoryPage;
