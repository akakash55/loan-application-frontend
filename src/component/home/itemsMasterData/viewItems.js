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
import { Select, MenuItem, InputLabel } from "@mui/material";

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

const ViewItems = ({ itemList, onDeleteClick, onUpdateClick }) => {

    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [editedItem, setEditedItem] = useState({});
    const handleUpdateClick = (item) => {
        // Open the edit dialog and set the edited employee's data
        setOpenEditDialog(true);
        setEditedItem(item);
    };

    const handleCloseEditDialog = () => {
        // Close the edit dialog
        setOpenEditDialog(false);
    };

    const handleSaveChanges = () => {
        // Make an API request to update the Item on the server with editedItem data
        onUpdateClick(editedItem);

        // Close the edit dialog
        setOpenEditDialog(false);
    };
    const handleDeleteClick = (itemId) => {
        onDeleteClick(itemId);
    };

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
                                    <Button Button type='submit' color='secondary' variant="contained" onClick={() => handleDeleteClick(row.itemId)}>
                                        Delete
                                    </Button>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Button Button type='submit' color='primary' variant="contained" onClick={() => handleUpdateClick(row)}>
                                        Update
                                    </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                <DialogTitle>Edit Item</DialogTitle>
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
                        label="Description"
                        variant="outlined"
                        fullWidth
                        value={editedItem.itemDescription}
                        onChange={(e) => setEditedItem({ ...editedItem, itemDescription: e.target.value })}
                    />
                    <InputLabel >Issue Status</InputLabel>
                    <Select
                        placeholder='Select status'
                        required
                        value={editedItem.issueStatus}
                        onChange={(e) => setEditedItem({ ...editedItem, issueStatus: e.target.value })}
                        sx={{
                            width: 400,
                            height: 40,
                        }}
                    >
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                    </Select>
                    <TextField
                        label="Value"
                        variant="outlined"
                        fullWidth
                        value={editedItem.itemValuation}
                        onChange={(e) => setEditedItem({ ...editedItem, itemValuation: e.target.value })}
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


    );
};

export default ViewItems;