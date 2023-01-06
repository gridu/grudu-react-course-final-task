import React from "react";
import { Routes, Route } from "react-router-dom";
import * as paths from "./Constants";
import Home from "./pages/home/Home";
import SignUp from "./pages/sign-up/SignUp";
import Login from "./pages/login/Login";
import HomeRedirectWrapper from "./util/HomeRedirectWrapper";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path={paths.homeUrl} element={<Home />} />
        <Route
          path={paths.loginUrl}
          element={
            <HomeRedirectWrapper>
              <Login />
            </HomeRedirectWrapper>
          }
        />
        <Route
          path={paths.signUpUrl}
          element={
            <HomeRedirectWrapper>
              <SignUp />
            </HomeRedirectWrapper>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
