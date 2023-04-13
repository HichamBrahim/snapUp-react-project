import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import { STATUS } from "../../utils/status";
import ClipLoader from "react-spinners/ClipLoader ";
import { useState } from "react";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";

function LoginForm() {
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState(STATUS.IDLE);
  const [showPassword, setShowPassword] = useState(false);
  const formShema = z.object({
    email: z.string().min(1, "Please enter your email address.").email(),
    password: z
      .string()
      .min(8, "Please enter at least 8 characters.")
      .max(20, "Please enter a maximum of 20 characters."),
  });
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
    resolver: zodResolver(formShema),
  });
  const onSubmit = (data) => {
    setLoginStatus(STATUS.LOADING);
    const { email, password } = data;
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setLoginStatus(STATUS.SUCCEEDED);
        toast.success("Login Successful!");
      })
      .catch(() => {
        setLoginStatus(STATUS.FAILED);
        toast.error("Incorrect username or password.!");
      });
  };
  useEffect(() => {
    if (loginStatus === STATUS.SUCCEEDED) {
      navigate("/account/profile");
    }
  }, [loginStatus]);

  function handleShowPassword() {
    setShowPassword((show) => !show);
  }
  return (
    <section className="min-h-screen my-4 md:h-screen">
      <div
        className="container mx-auto p-4 h-full flex flex-col
            items-center space-y-16 md:flex-row md:space-y-0"
      >
        <div className="flex-1 lg:border-r-1">
          <h3 className="text-lg text-center opacity-80">LOG IN</h3>
          {loginStatus === STATUS.FAILED && (
            <div
              className="flex items-center justify-center space-x-3 bg-backRed text-white
            p-2 px-3 text-center w-350 mx-auto"
            >
              <i className="text-16 fa-solid fa-triangle-exclamation"></i>
              <p>Incorrect username or password.</p>
            </div>
          )}
          <form
            className="w-350 h-fit mt-6 space-y-4 mx-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className={`px-3 py-2 border-1 ${
                errors.email ? "border-red" : "border-lightPink"
              } w-full outline-none`}
              type="email"
              placeholder="Email"
              {...register("email")}
            />
            {errors.email && (
              <div className="text-sm text-red pt-1 flex space-x-1">
                <i className="text-16 fa-solid fa-triangle-exclamation"></i>
                <p>{errors.email.message}</p>
              </div>
            )}
            <div
              className={`flex items-center justify-between border-1 ${
                errors.password ? "border-red" : "border-lightPink"
              } w-full outline-none px-3`}
            >
              <input
                className="py-2 w-full outline-none"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password")}
              />
              <span onClick={handleShowPassword}>
                {showPassword ? (
                  <i className="fa-solid fa-eye"></i>
                ) : (
                  <i className="fa-solid fa-eye-slash"></i>
                )}
              </span>
            </div>
            {errors.password && (
              <div className="text-sm text-red pt-1 flex space-x-1">
                <i className="text-16 fa-solid fa-triangle-exclamation"></i>
                <p>{errors.password.message}</p>
              </div>
            )}
            <button
              className="w-full px-3 py-2 bg-lightOrange text-white duration-300 hover:bg-mainOrange"
              type="submit"
            >
              {loginStatus === STATUS.LOADING ? (
                <ClipLoader color="white" size={20} />
              ) : (
                "LOGIN"
              )}
            </button>
            <Link to={"/account/login/recover"}>
              <div
                className="w-fit mx-auto mt-4 pb-1 border-b-1 duration-300
                        border-lightOrange opacity-75 hover:border-none hover:opacity-100"
              >
                FORGOT PASSWORD?
              </div>
            </Link>
          </form>
        </div>
        <div className="flex-1">
          <h3 className="text-lg text-center opacity-80">NEW HERE?</h3>
          <div className="text-sm opacity-90 w-350 mx-auto mt-8">
            <p>Create an account with us and you&apos;ll be able to:</p>
            <ul className="p-6 space-y-3">
              <li className="space-x-3">
                <i className="fa-solid fa-credit-card"></i>
                <span>Check out faster.</span>
              </li>
              <li className="space-x-3">
                <i className="fa-regular fa-bookmark"></i>
                <span>Save multiple shipping addresses</span>
              </li>
              <li className="space-x-3">
                <i className="fa-regular fa-closed-captioning"></i>
                <span>Access your order history</span>
              </li>
              <li className="space-x-3">
                <i className="fa-regular fa-map"></i>
                <span>Track new orders</span>
              </li>
            </ul>
          </div>
          <Link to={"/account/register"}>
            <button
              className="block w-350 mx-auto px-3 py-2 bg-lightPink
                    duration-300 hover:bg-mainPink mt-2"
            >
              CREATE ACCOUNT
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
