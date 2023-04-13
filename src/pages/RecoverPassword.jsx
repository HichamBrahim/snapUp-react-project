import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { auth } from "../firebase/firebase.config";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { useState } from "react";
import { STATUS } from "../utils/status";
import ClipLoader from "react-spinners/ClipLoader ";
import ToggleLayout from "../components/Layout/ToggleLayout";
import { Helmet } from "react-helmet-async";
function RecoverPassword() {
  const [resetStatus, setResetStatus] = useState(STATUS.IDLE);
  const formShema = z.object({
    email: z.string().min(1, "Please enter your email address.").email(),
  });
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
    },
    mode: "all",
    resolver: zodResolver(formShema),
  });
  const onSubmit = (data) => {
    setResetStatus(STATUS.LOADING);
    sendPasswordResetEmail(auth, data.email)
      .then(() => {
        setResetStatus(STATUS.SUCCEEDED);
        toast.success("Password reset email sent. Cheers!");
      })
      .catch((error) => {
        setResetStatus(STATUS.FAILED);
        const errorMessage = error.message;
        toast.error("Email Incorrect!");
        console.log(errorMessage);
      });
  };
  return (
    <main className="bg-WhiteSmoke">
      <Helmet>
        <title>
          Recover Your SnapUp Password - Step-by-Step Guide to Reset Your
          Password
        </title>
        <link rel="icon" type="image/png" href="icon.jpg" sizes="32x32" />
      </Helmet>
      <div className="container p-4 mx-auto">
        <ToggleLayout />
        <section className="min-h-75 h-75">
          <div className="flex justify-center items-center h-full">
            <div className="w-350 mx-auto text-center h-fit">
              {resetStatus === STATUS.FAILED && (
                <div
                  className="flex items-center justify-center space-x-3 bg-backRed text-white
            p-2 px-3 text-center w-350 mx-auto mb-3"
                >
                  <i className="fa-solid fa-triangle-exclamation"></i>
                  <p>Email Incorrect!</p>
                </div>
              )}
              {resetStatus === STATUS.SUCCEEDED && (
                <div
                  className="flex items-center justify-center space-x-3 bg-green text-white
            p-2 px-3 text-center w-350 mx-auto mb-3"
                >
                  <i className="fa-solid fa-check"></i>
                  <p>Password has been reset!</p>
                </div>
              )}
              <h3 className="text-lg font-extarlight">FORGOT PASSWORD?</h3>
              <p className="text-sm pt-4">
                Fill in your email below to request a new password. An email
                will be sent to the address below containing a link to verify
                your email address.
              </p>
              <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                <div
                  className={` flex items-center space-x-3 p-2 bg-white 
                        border-1 ${
                          errors.email ? "border-red" : "border-lightPink"
                        }`}
                >
                  <i className="fa-solid fa-envelope"></i>
                  <input
                    className="w-full outline-none"
                    type="text"
                    placeholder="email"
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <div className="text-sm text-red pt-1 flex space-x-1">
                    <i className="text-16 fa-solid fa-triangle-exclamation"></i>
                    <p>{errors.email.message}</p>
                  </div>
                )}
                <button
                  className="w-full px-3 py-2 mt-4 bg-lightOrange text-white duration-300 hover:bg-mainOrange"
                  type="submit"
                >
                  {resetStatus === STATUS.LOADING ? (
                    <ClipLoader color="white" size={20} />
                  ) : (
                    "SUBMIT"
                  )}
                </button>
                <Link to={"/account/login"}>
                  <div
                    className="w-fit mx-auto mt-4 pb-1 border-b-1 duration-300
                            border-lightOrange opacity-75 hover:border-transparant hover:opacity-100"
                  >
                    CANCEL
                  </div>
                </Link>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default RecoverPassword;
