import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const AlreadySignin = ({ children }) => {
  const { token } = useAuth();

  return <>{!token ? children : <Navigate to="/" />}</>;
};

export default AlreadySignin;
