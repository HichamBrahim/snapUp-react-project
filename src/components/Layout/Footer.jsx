import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const date = new Date();
  return (
    <footer className="bg-mainOrange text-white text-sm py-2 font-light">
      <div className="container mx-auto p-4 space-y-2">
        <ul className="flex space-x-6 justify-center capitalize">
          <li>
            <Link to={"/"}>PRIVACY POLICY</Link>
          </li>
          <li>
            <Link to={"/"}>TERM OF SERVICE</Link>
          </li>
          <li>
            <Link to={"/"}>ABOUT SNAPUP.</Link>
          </li>
        </ul>
        <div className="text-center">
          {`© ${date.getFullYear()} SnapUp. All Rights Reserved.`}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
