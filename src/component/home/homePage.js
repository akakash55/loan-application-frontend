import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Link, Route, Routes } from 'react-router-dom';

const HomePage = () => {


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, height: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <Link to="/customerdatamanagment">
              <TableCell align="center">
                <Button variant="contained">Customer Data<br /> Managment</Button>
              </TableCell>
            </Link>
            <Link to="/loancardmanagment">
              <TableCell align="center">
                <Button variant="outlined">Loan Card<br /> Managment</Button>
              </TableCell>
            </Link>
            <Link to="/itemsmasterlist">
              <TableCell align="center">
                <Button variant="contained">Items Master<br /> List</Button>
              </TableCell>
            </Link>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>


  );
};

export default HomePage;