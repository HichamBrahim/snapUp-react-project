import React from "react";
import LoginForm from "../components/Common/LoginForm";
import ToggleLayout from "../components/Layout/ToggleLayout";
import { Helmet } from "react-helmet-async";

function Login() {
  return (
    <main>
      <Helmet>
        <title>Login to Your SnapUp Account - Secure and Easy Access</title>
        <link rel="icon" type="image/png" href="icon.jpg" sizes="32x32" />
      </Helmet>
      <ToggleLayout />
      <LoginForm />
    </main>
  );
}

export default Login;
