import React from 'react';
import { Routes, Route } from "react-router-dom"
import Login from './component/auth/login';
import HomePage from './component/home/homePage'
import CustomerDataManagment from './component/home/customerDataManagment/customerDataManagment';
import ItemsMasterList from './component/home/itemsMasterData/itemsMasterData';
import LoanCardManagment from './component/home/loanCardManagment/loanCardManagment';
// import Login from './component/auth/Login';

function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={ <HomePage/> } />
      <Route path="login" element={ <Login/> } />
      <Route path="customerdatamanagment" element={ <CustomerDataManagment/> } />
      <Route path="itemsmasterlist" element={ <ItemsMasterList/> } />
      <Route path="loancardmanagment" element={ <LoanCardManagment/> } />
    </Routes>
  </div>
  );
}

export default App;
