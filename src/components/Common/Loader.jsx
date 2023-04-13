import loader from "../../assets/loader.svg";
import React from "react";
const Loader = () => {
  return (
    <div className="flex justify-center align-center">
      <img className="w-20" src={loader} alt="loading..." />
    </div>
  );
};

export default Loader;
