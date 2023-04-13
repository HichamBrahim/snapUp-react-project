import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader ";
import { STATUS } from "../../utils/status";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase/firebase.config";
import { setDoc, doc } from "firebase/firestore";

function RegisterForm() {
  const navigate = useNavigate();
  const [userStatus, setUserStatus] = useState(STATUS.IDLE);
  const [showPassword, setShowPassword] = useState(false);
  const formShema = z.object({
    firstName: z
      .string()
      .min(1, "Please enter your fisrt name.")
      .max(20, "Please enter a maximum of 20 characters."),
    lastName: z
      .string()
      .min(1, "Please enter your last name.")
      .max(20, "Please enter a maximum of 20 characters."),
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
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    mode: "all",
    resolver: zodResolver(formShema),
  });
  const handleUserSubmit = async (data) => {
    setUserStatus(STATUS.LOADING);
    try {
      const { firstName, lastName, email, password } = data;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      updateProfile(auth.currentUser, {
        displayName: `${firstName} ${lastName}`,
      });
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: `${firstName} ${lastName}`,
        email,
        password,
      });
      setUserStatus(STATUS.SUCCEEDED);
      toast.success("Registration Successful!");
    } catch (error) {
      setUserStatus(STATUS.FAILED);
      const errorMessage = error.message;
      toast.error("Sorry, this account already exists");
      console.log(errorMessage);
    }
  };
  useEffect(() => {
    if (userStatus === STATUS.SUCCEEDED) {
      navigate("/account/login");
    }
  }, [userStatus, navigate]);
  function handleShowPassword() {
    setShowPassword((show) => !show);
  }

  return (
    <section className="h-screen">
      <div
        className="container mx-auto p-4 h-full flex flex-col
            items-center space-y-16 md:flex-row md:space-y-0"
      >
        <div className="flex-1 lg:border-r-1">
          <h3 className="text-lg text-center opacity-80">CREATE ACCOUNT</h3>
          <form
            className="w-350 h-fit mt-6 space-y-4 mx-auto"
            onSubmit={handleSubmit(handleUserSubmit)}
          >
            <div>
              <input
                className={`px-3 py-2 border-1 ${
                  errors.firstName ? "border-red" : "border-lightPink"
                } w-full outline-none`}
                type="text"
                placeholder="First name"
                {...register("firstName")}
              />
              {errors.firstName && (
                <div className="text-sm text-red pt-1 flex space-x-1">
                  <i className="text-16 fa-solid fa-triangle-exclamation"></i>
                  <p>{errors.firstName.message}</p>
                </div>
              )}
            </div>
            <div>
              <input
                className={`px-3 py-2 border-1 ${
                  errors.lastName ? "border-red" : "border-lightPink"
                } w-full outline-none`}
                type="text"
                placeholder="Last name"
                {...register("lastName")}
              />
              {errors.lastName && (
                <div className="text-sm text-red pt-1 flex space-x-1">
                  <i className="text-16 fa-solid fa-triangle-exclamation"></i>
                  <p>{errors.lastName.message}</p>
                </div>
              )}
            </div>
            <div>
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
            </div>
            <div>
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
                  <i className="fa-solid fa-triangle-exclamation"></i>
                  <p>{errors.password.message}</p>
                </div>
              )}
            </div>
            <p className="text-sm opacity-90">
              By Creating an account, you agree to our User Agreement and
              acknowledge reading our User Privacy Notice .
            </p>
            <button
              className="w-full px-3 py-2 bg-lightOrange text-white duration-300 hover:bg-mainOrange"
              type="submit"
            >
              {userStatus === STATUS.LOADING ? (
                <ClipLoader color="white" size={20} />
              ) : (
                "Create account"
              )}
            </button>
          </form>
        </div>
        <div className="flex-1">
          <h3 className="text-center text-lg opacity-80">
            ALREADY HAVE AN ACCOUNT
          </h3>
          <Link to={"/account/login"}>
            <button
              className="block w-350 mx-auto px-3 py-2 bg-lightPink
                    duration-300 hover:bg-mainPink mt-4"
            >
              LOGIN
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default RegisterForm;
