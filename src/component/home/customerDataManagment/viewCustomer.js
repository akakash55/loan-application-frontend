import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';

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

const ViewCustomer = ({ customerData, onDeleteClick, onUpdateClick }) => {
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [editedEmployee, setEditedEmployee] = useState({});
    const ROLE = JSON.parse(localStorage.getItem('ROLE'));
    const handleUpdateClick = (employee) => {
        // Open the edit dialog and set the edited employee's data
        setOpenEditDialog(true);
        setEditedEmployee(employee);
    };

    const handleCloseEditDialog = () => {
        // Close the edit dialog
        setOpenEditDialog(false);
    };

    const handleSaveChanges = () => {
        // Make an API request to update the employee on the server with editedEmployee data
        onUpdateClick(editedEmployee);

        // Close the edit dialog
        setOpenEditDialog(false);
    };
    const handleDeleteClick = (employeeId) => {
        onDeleteClick(employeeId);
    };

    return (
        <>
            {ROLE === 'ADMIN' ? (
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
                                            <Button Button type='submit' color='secondary' variant="outlined" onClick={() => handleDeleteClick(row.employeeId)}>
                                                Delete
                                            </Button>
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <Button Button type='submit' color='primary' variant="outlined" onClick={() => handleUpdateClick(row)}>
                                                Update
                                            </Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {/* Edit Dialog */}
                    <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                        <DialogTitle>Edit Employee</DialogTitle>
                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={handleCloseEditDialog}
                            aria-label="close"
                            style={{
                                position: 'absolute',
                                right: '8px',
                                top: '8px',
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <DialogContent>
                            <TextField
                                label="Employee Name"
                                variant="outlined"
                                fullWidth
                                value={editedEmployee.employeeName}
                                onChange={(e) => setEditedEmployee({ ...editedEmployee, employeeName: e.target.value })}
                            />
                            <TextField
                                label="Designation"
                                variant="outlined"
                                fullWidth
                                value={editedEmployee.designation}
                                onChange={(e) => setEditedEmployee({ ...editedEmployee, designation: e.target.value })}
                            />
                            <TextField
                                label="Department"
                                variant="outlined"
                                fullWidth
                                value={editedEmployee.department}
                                onChange={(e) => setEditedEmployee({ ...editedEmployee, department: e.target.value })}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseEditDialog} color="secondary">
                                Cancel
                            </Button>
                            <Button onClick={handleSaveChanges} color="primary">
                                Save Changes
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
            ) : (
                <p>Unauthorized</p>
            )}
        </>
    );
}

export default ViewCustomer