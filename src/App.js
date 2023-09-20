import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom"
import Login from './component/auth/login';
import HomePage from './component/home/homePage'
import CustomerDataManagment from './component/home/customerDataManagment/customerDataManagment';
import ItemsMasterList from './component/home/itemsMasterData/itemsMasterData';
import LoanCardManagment from './component/home/loanCardManagment/loanCardManagment';
import SignUp from './component/auth/signup';
import EmployeeLogin from './component/auth/employeeLogin';
import ApplyLoan from './component/home/employee/applyLoan/applyLoan';
import ItemsPurchased from './component/home/employee/itemsPurchased/itemsPurchased';
import ViewLoan from './component/home/employee/viewLoan/viewLoan';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login/admin" element={<Login />} />
        <Route path="/login/employee" element={<EmployeeLogin />} />
        <Route path="/signup/employee" element={<SignUp />} />
        <Route path="/customerdatamanagment" element={<CustomerDataManagment />} />
        <Route path="/itemsmasterlist" element={<ItemsMasterList />} />
        <Route path="/loancardmanagment" element={<LoanCardManagment />} />
        <Route path="/applyloan" element={<ApplyLoan />} />
        <Route path="/itemspurchased" element={<ItemsPurchased />} />
        <Route path="/viewloan" element={<ViewLoan />} />
        <Route path="*"
          element={
            <div>
              <h2>404 Page not found</h2>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;