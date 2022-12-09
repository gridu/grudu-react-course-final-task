import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { homeUrl } from "../Constants";

/**
 * Wrapper that redirects directly to the home page if user is logged in
 * @param children the children component to be used if auth is false
 */
const HomeRedirectWrapper = ({ children }: { children: JSX.Element }) => {
  const auth = useSelector((state: any) => state.user.loggedIn);

  return auth ? <Navigate to={homeUrl} replace /> : children;
};

export default HomeRedirectWrapper;
