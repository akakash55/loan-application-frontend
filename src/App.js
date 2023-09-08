import React from 'react';
import { Routes, Route } from "react-router-dom"
import Login from './component/auth/login';
import HomePage from './component/home/homePage'
// import Login from './component/auth/Login';

function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={ <HomePage/> } />
      <Route path="login" element={ <Login/> } />
    </Routes>
  </div>
  );
}

export default App;
