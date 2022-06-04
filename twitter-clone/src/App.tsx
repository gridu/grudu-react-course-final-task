import React from 'react';
import { Routes, Route, Link } from "react-router-dom";

import Login from "./pages/Auth/Login";
import Signup from './pages/Auth/Signup';

import * as URLS from './constants/urls';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={URLS.LOGIN} element={<Login />} />
        <Route path={URLS.SIGNUP} element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
