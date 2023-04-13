import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../custom-hook/useAuth";
import PropTypes from "prop-types";
function ProtectedRoute({ children }) {
  const { login } = useAuth();
  return login ? children : <Navigate to="/account/login" />;
}
ProtectedRoute.propTypes = {
  children: PropTypes.node,
};
export default ProtectedRoute;
