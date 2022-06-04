import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import logo from './logo.svg';

import Login from "./pages/Auth/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
