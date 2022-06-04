import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import logo from './logo.svg';

import Login from "./pages/Auth/Login";
import Signup from './pages/Auth/Signup';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
