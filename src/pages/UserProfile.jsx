import React from "react";
import ToggleLayout from "../components/Layout/ToggleLayout";
import { useAuth } from "../custom-hook/useAuth";
import profile from "../assets/profile.png";
import { toast } from "react-toastify";
import { auth } from "../firebase/firebase.config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function UserProfile() {
  const navigete = useNavigate();
  const { currentUser } = useAuth();
  function logOut() {
    toast.success("Logout Successful!");
    setTimeout(() => {
      navigete("/account/login");
      signOut(auth);
    }, 400);
  }
  return (
    <main>
      <Helmet>
        <title>
          Your SnapUp Profile - Manage Your Orders, Preferences, and More
        </title>
        <link rel="icon" type="image/png" href="icon.jpg" sizes="32x32" />
      </Helmet>
      <ToggleLayout />
      <section className="min-h-screen h-screen bg-WhiteSmoke">
        <div className="container mx-auto p-4 h-full flex items-center">
          <div className="w-full">
            <div className="w-fit mx-auto text-center">
              <h1 className="text-3xl font-bold pb-2 tracking-widest">
                My Account
              </h1>
              <span className="underline cursor-pointer" onClick={logOut}>
                SignOut
              </span>
            </div>
            <div className="flex flex-col w-full justify-between md:flex-row h-full mt-10">
              <p className="text-center md:text-start p-4 md:p-0">
                You haven&apos;t placed any orders yet.
              </p>
              <ul className="px-10 py-16 bg-white space-y-6 capitalize">
                <li>
                  <img
                    className="w-24 mx-auto object-cover"
                    src={profile}
                    alt="profile"
                  />
                </li>
                <li className="font-bold">{currentUser.displayName}</li>
                <li className="opacity-90">{currentUser.email}</li>
                <li className="opacity-90">UNITED STATES</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default UserProfile;
