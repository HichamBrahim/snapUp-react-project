import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Common/Button";
import ToggleLayout from "../components/Layout/ToggleLayout";
import notfound from "../assets/not_found.png";
import { Helmet } from "react-helmet-async";

function NotFound() {
  return (
    <main>
      <Helmet>
        <title>Page Not Found - SnapUp</title>
        <link rel="icon" type="image/png" href="icon.jpg" sizes="32x32" />
      </Helmet>
      <ToggleLayout />
      <section className="min-h-75 bg-WhiteSmoke flex justify-center">
        <div className="pt-8">
          <img className="w-96 mx-auto" src={notfound} alt="404" />
          <div className="opacity-70 text-xl text-center pb-3">
            Looks like this page is missing
          </div>
          <Link to={"/"}>
            <div className="w-fit mx-auto text-sm">
              <Button width="">Go to homepage</Button>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default NotFound;
