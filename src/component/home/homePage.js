import React from 'react';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import useStyles from './styles';

const HomePage = () => {


  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh' }}
    >
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
    </Grid>


  );
};

export default HomePage;