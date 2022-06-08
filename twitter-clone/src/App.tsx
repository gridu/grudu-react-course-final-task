import React from 'react';
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Auth/Login";
import Signup from './pages/Auth/Signup';
import Home from './pages/Home/Home';

import * as URLS from './constants/urls';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={URLS.LOGIN} element={<Login />} />
        <Route path={URLS.SIGNUP} element={<Signup />} />
        <Route path={URLS.HOME} element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
