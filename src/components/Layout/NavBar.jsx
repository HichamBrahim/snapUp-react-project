import { signOut } from "firebase/auth";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../custom-hook/useAuth";
import { auth } from "../../firebase/firebase.config";
import profile from "../../assets/profile.png";
function NavBar() {
  const {login} = useAuth();
  const navigete = useNavigate();
  function logOut() {
    toast.success("Logout Successful!");
    setTimeout(() => {
      navigete("/account/login");
      signOut(auth);
    }, 400);
  }

  let content;
  if (login) {
    content = (
      <>
        <li>
          <Link to={"/account/profile"}>
            <img className="w-12 object-cover" src={profile} alt="profile" />
          </Link>
        </li>
        <li className="cursor-pointer underline" onClick={logOut}>
          Sign Out
        </li>
      </>
    );
  } else {
    content = (
      <>
        <li
          className="relative before:content[''] before:hidden before:absolute before:-right-4
            before:h-full before:w-0.5 before:bg-lightOrange before:sm:block"
        >
          <Link to={"/account/register"}>Register</Link>
        </li>
        <li className="nav--login">
          <Link to={"/account/login"}>Log in</Link>
        </li>
      </>
    );
  }

  return (
    <nav
      className="flex flex-col items-center justify-between py-2
    text-13 border-b-1 border-lightOrange space-y-2
    md:flex-row"
    >
      <ul className="flex items-center space-x-2 sm:space-x-6">
        <li
          className="relative before:content[''] before:hidden before:absolute before:-right-4
                    before:h-full before:w-0.5 before:bg-lightOrange before:sm:block"
        >
          <Link to={"/"}>Seller Center</Link>
        </li>
        <li
          className="relative before:content[''] before:hidden before:absolute before:-right-4
                    before:h-full before:w-0.5 before:bg-lightOrange before:sm:block"
        >
          <Link to={"/"}>Download</Link>
        </li>
        <li className="flex items-center space-x-2 sm:space-x-3">
          <span>Follow as on</span>
          <a href="facebook.com">
            <i className="text-16 fa-brands fa-facebook"></i>
          </a>
          <a href="instagram.com">
            <i className="text-16 fa-brands fa-instagram"></i>
          </a>
        </li>
      </ul>
      <ul className="flex items-center space-x-2 sm:space-x-6">
        <li
          className="relative flex items-center space-x-1 sm:space-x-2 before:content[''] before:hidden before:absolute before:-right-4
                    before:h-full before:w-0.5 before:bg-lightOrange before:sm:block"
        >
          <i className="text-16 fa-solid fa-circle-question"></i>
          <span>Support</span>
        </li>
        {content}
      </ul>
    </nav>
  );
}

export default NavBar;
