import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar/navbar';
import useStyles from './styles';
import AdminHome from './homepage/adminHome';


const HomePage = () => {
  const [admin, setAdmin] = useState(false);
  const [employee, setEmployee] = useState(false);
  const navigate = useNavigate();
  const ROLE = JSON.parse(localStorage.getItem('ROLE'))
  console.log(ROLE);
  useEffect(() => {
    if (ROLE == "ADMIN") {
      setAdmin(true);
    }
  }, [ROLE])


  return (
    <>
      <Navbar />
      {admin && <AdminHome />}

    </>

  );
};

export default HomePage;