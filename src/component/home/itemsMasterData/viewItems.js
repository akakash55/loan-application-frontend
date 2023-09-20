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

const ViewItems = ({ itemList }) => {

    return (
        <Grid>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Item Id</StyledTableCell>
                            <StyledTableCell >Category</StyledTableCell>
                            <StyledTableCell >Description</StyledTableCell>
                            <StyledTableCell >Item Make</StyledTableCell>
                            <StyledTableCell >issue Status</StyledTableCell>
                            <StyledTableCell >Value</StyledTableCell>
                            <StyledTableCell ></StyledTableCell>
                            <StyledTableCell ></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {itemList.map((row) => (
                            <StyledTableRow key={row.itemId}>
                                <StyledTableCell component="th" scope="row">
                                    {row.itemId}
                                </StyledTableCell>
                                <StyledTableCell >{row.itemCategory}</StyledTableCell>
                                <StyledTableCell >{row.itemDescription}</StyledTableCell>
                                <StyledTableCell >{row.itemMake}</StyledTableCell>
                                <StyledTableCell >{row.issueStatus}</StyledTableCell>
                                <StyledTableCell >{row.itemValuation
                                }</StyledTableCell>
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
};

export default ViewItems;