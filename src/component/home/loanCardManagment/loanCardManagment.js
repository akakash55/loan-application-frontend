import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Grid, Typography } from '@material-ui/core';
import Navbar from '../navbar/navbar';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(loanId, loanType, duration, cardIssueDate) {
  return { loanId, loanType, duration, cardIssueDate };
}

const rows = [
  createData('L00001', 'Furniture', 5, '01-01-2000'),
  createData('L00002', 'Stationery', 3, '02-02-2002')
];

const LoanCardManagment = () => {
  const ROLE = JSON.parse(localStorage.getItem('ROLE'));
  const [pending, setPending] = useState(true);
  const [accept, setAccept] = useState();
  const [reject, setReject] = useState();
  const [loanList, setLoanList] = useState([]);
  const [updatedTransaction, setUpdatedTransaction] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');

  const navigate = useNavigate();

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const fetchAllLoan = async () => {
    const url = `http://localhost:8080/api/transaction/all`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // console.log(data);
      setLoanList(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchAllLoan();
  }, [])


  const handleAccept = async (transaction) => {
    console.log("up");
    console.log(transaction);
    const updatedTransaction = { ...transaction, status: 'ACCEPTED' };
    try {
      const response = await fetch(`http://localhost:8080/api/transaction/${transaction.transactionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTransaction),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setLoanList(updatedData);
        console.log('Loan Accepted successfully');
        setPending(false);
        setSnackbarMessage('Loan Accepted successfully');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setTimeout(() => {
          fetchAllLoan();
        }, 1000);
      } else {
        console.error('Failed to accept loan');
        setSnackbarMessage('Failed to accept loan');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error updating item:', error);
      setSnackbarMessage('Failed to accept loan');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleReject = async (transaction) => {
    console.log("up");
    console.log(transaction);
    const updatedTransaction = { ...transaction, status: 'REJECTED' };
    try {
      const response = await fetch(`http://localhost:8080/api/transaction/${transaction.transactionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTransaction),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setLoanList(updatedData);
        console.log('Loan Rejected successfully');
        setPending(false);
        setSnackbarMessage('Loan Rejected successfully');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setTimeout(() => {
          fetchAllLoan();
        }, 1000);
      } else {
        console.error('Failed to accept loan');
        setSnackbarMessage('Failed to accept loan');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error updating item:', error);
      setSnackbarMessage('Failed to accept loan');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      <Navbar />
      {ROLE === 'ADMIN' ? (
        <>
          <Paper elevation={0} sx={{ marginTop: 10, mx: 10, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">All Loans</Typography>
          </Paper>
          <Grid container spacing={2} sx={{ padding: 20 }}>
            <TableContainer sx={{ padding: 10 }}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Loan Id</StyledTableCell>
                    <StyledTableCell >Employee ID</StyledTableCell>
                    <StyledTableCell >Loan Category</StyledTableCell>
                    <StyledTableCell >Amount(Rs.)</StyledTableCell>
                    <StyledTableCell >Duration(months)</StyledTableCell>
                    <StyledTableCell >Date Created</StyledTableCell>
                    <StyledTableCell >Status</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(loanList) && loanList.length > 0 ? (
                    loanList.map((row) => (
                      <StyledTableRow key={row.transactionId}>
                        <StyledTableCell component="th" scope="row">
                          {row.transactionId}
                        </StyledTableCell>
                        <StyledTableCell>{row.employeeId}</StyledTableCell>
                        <StyledTableCell>{row.category ? row.category : 'Loan'}</StyledTableCell>
                        <StyledTableCell>Rs. {row.amount}</StyledTableCell>
                        <StyledTableCell>{row.duration} months</StyledTableCell>
                        <StyledTableCell>{new Date(row.timestamp).toLocaleString("en-US")}</StyledTableCell>
                        <StyledTableCell style={{ color: row.status === 'REJECTED' ? '#f73378' : row.status === 'ACCEPTED' ? '#303f9f' : 'inherit' }}>
                          {row.status === "PENDING" ? (
                            <>
                              <Button type='submit' color='primary' variant="outlined" onClick={() => handleAccept(row)}>
                                Accept
                              </Button>
                              <Button type='submit' color='secondary' variant="outlined" onClick={() => handleReject(row)}>
                                Reject
                              </Button>
                            </>
                          ) : (
                            row.status
                          )}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))
                  ) : (
                    <StyledTableRow>
                      <StyledTableCell colSpan={7}>No loans to display</StyledTableCell>
                    </StyledTableRow>
                  )}
                </TableBody>

              </Table>
            </TableContainer>
          </Grid>
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              severity={snackbarSeverity}
              onClose={handleSnackbarClose}
              sx={{
                backgroundColor: snackbarSeverity === 'success' ? '#4CAF50' : '#F44336',
              }}
            >
              {snackbarMessage}
            </MuiAlert>
          </Snackbar>
        </>
      ) : (
        <p>Unauthorized</p>
      )}
    </>
  );
}

export default LoanCardManagment