import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom"
import Login from './component/auth/login';
import HomePage from './component/home/homePage'
import CustomerDataManagment from './component/home/customerDataManagment/customerDataManagment';
import ItemsMasterList from './component/home/itemsMasterData/itemsMasterData';
import LoanCardManagment from './component/home/loanCardManagment/loanCardManagment';
import SignUp from './component/auth/signup';
import AddCustomer from './component/home/customerDataManagment/addCustomer';
import EmployeeLogin from './component/auth/employeeLogin';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login/admin" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login/admin" element={<Login />} />
        <Route path="/login/employee" element={<EmployeeLogin />} />
        <Route path="/signup/employee" element={<SignUp />} />
        <Route path="/customerdatamanagment" element={<CustomerDataManagment />} />
        <Route path="/customerdatamanagment/add" element={<AddCustomer />} />
        <Route path="/itemsmasterlist" element={<ItemsMasterList />} />
        <Route path="/loancardmanagment" element={<LoanCardManagment />} />
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