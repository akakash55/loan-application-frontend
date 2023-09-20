import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Grid } from '@material-ui/core';

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

const ViewCustomer = ({ customerData }) => {

    return (
        <Grid>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Emp Id</StyledTableCell>
                            <StyledTableCell >Emp Name</StyledTableCell>
                            <StyledTableCell >Designation</StyledTableCell>
                            <StyledTableCell >Department</StyledTableCell>
                            <StyledTableCell >Gender</StyledTableCell>
                            <StyledTableCell >DOB</StyledTableCell>
                            <StyledTableCell >DOJ</StyledTableCell>
                            <StyledTableCell ></StyledTableCell>
                            <StyledTableCell ></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customerData.map((row) => (
                            <StyledTableRow key={row.userName}>
                                <StyledTableCell component="th" scope="row">
                                    {row.userName}
                                </StyledTableCell>
                                <StyledTableCell >{row.employeeName}</StyledTableCell>
                                <StyledTableCell >{row.designation}</StyledTableCell>
                                <StyledTableCell >{row.department}</StyledTableCell>
                                <StyledTableCell >{row.gender}</StyledTableCell>
                                <StyledTableCell >{row.dateOfBirth
                                }</StyledTableCell>
                                <StyledTableCell >{row.dateOfJoining}</StyledTableCell>
                                <StyledTableCell>
                                    <Button Button type='submit' color='secondary' variant="contained" >
                                        Delete
                                    </Button>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Button Button type='submit' color='primary' variant="contained" >
                                        Update
                                    </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
}

export default ViewCustomer