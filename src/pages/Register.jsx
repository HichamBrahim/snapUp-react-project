import React from "react";
import RegisterForm from "../components/Common/RegisterForm";
import ToggleLayout from "../components/Layout/ToggleLayout";
import { Helmet } from "react-helmet-async";
function Register() {
  return (
    <main className="main">
      <Helmet>
        <title>Sign Up for a SnapUp Account - Get Started Today</title>
        <link rel="icon" type="image/png" href="icon.jpg" sizes="32x32" />
      </Helmet>
      <ToggleLayout />
      <RegisterForm />
    </main>
  );
}

export default Register;
