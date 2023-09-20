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
import Navbar from '../../navbar/navbar';
import { Container } from '@mui/material';

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

const ItemsPurchased = () => {
    const [employeeId, setEmployeeId] = useState(parseInt(JSON.parse(localStorage.getItem('USERID'))));
    const [userName, setUserName] = useState(JSON.parse(localStorage.getItem('USERNAME')));
    const [employee, setEmployee] = useState(false);
    const [loanList, setLoanList] = useState([]);
    const ROLE = JSON.parse(localStorage.getItem('ROLE'));

    useEffect(() => {
        if (ROLE === "EMPLOYEE") {
            setEmployee(true);
        }

    }, [ROLE]);

    const fetchUserLoan = async () => {
        const url = `http://localhost:8080/api/transaction/employee/${employeeId}`;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            setLoanList(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchUserLoan();
    }, [])

    return (
        <>
            <Navbar />
            {employee && (
                <>
                    <Paper elevation={0} sx={{ marginTop: 15, mx: 10, display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h6">Emp ID : {userName}</Typography>
                        <Typography variant="h6">Designation : Manager</Typography>
                        <Typography variant="h6">Department : Finance</Typography>
                    </Paper>
                    <Grid container spacing={2} sx={{ padding: 20 }}>
                        <TableContainer sx={{ padding: 10 }}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell >Item purchased</StyledTableCell>
                                        <StyledTableCell >Amount(Rs.)</StyledTableCell>
                                        <StyledTableCell >Time and Date</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {loanList.map((row) => (
                                        <StyledTableRow key={row.employeeId}>
                                            <StyledTableCell >{(row.category) ? row.category : 'Cash'}</StyledTableCell>
                                            <StyledTableCell >Rs. {row.amount}</StyledTableCell>
                                            <StyledTableCell >{new Date(row.timestamp).toLocaleString("en-US")}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </>
            )}
        </>
    );
}

export default ItemsPurchased