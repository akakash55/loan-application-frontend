import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, InputAdornment, IconButton } from '@material-ui/core';
import { Stack, Alert } from "@mui/material";
import { Select, MenuItem, InputLabel } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const AddItem = (props) => {

    const [itemId, setItemId] = useState();
    const [itemCategory, setItemCategory] = useState();
    const [itemDescription, setItemDescription] = useState();
    const [itemValuation, setItemValuation] = useState();
    const [issueStatus, setIssueStatus] = useState();
    const [itemMake, setItemMake] = useState();
    const [itemValueError, setItemValueError] = useState(false);
    const [formValid, setFormValid] = useState();
    const [success, setSuccess] = useState();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('error');

    const paperStyle = { padding: 20, height: '80vh', width: 400, margin: "20px auto" };
    const avatarStyle = { backgroundColor: '#1bbd7e' };
    const btnstyle = { margin: '8px 0' };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const handleItemValueError = () => {
        if (!itemValuation || itemValuation <= 0) {
            setItemValueError(true);
            return;
        }
        setItemValueError(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(null);
        if (itemValueError || !itemValuation) {
            setFormValid("Item valuation cannot be negative or zero");
            return;
        }
        setFormValid(null);
        console.log(itemId);
        console.log(itemCategory);
        console.log(itemDescription);
        console.log(itemValuation);
        console.log(issueStatus);
        console.log(itemMake);
        console.log("Added success");
        try {
            const url = 'http://localhost:8080/api/item/create';
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    itemCategory, itemDescription, itemValuation, issueStatus, itemMake
                })
            };
            const response = await fetch(url, requestOptions);

            if (response.status === 200) {
                const responseText = await response.text();
                console.log(responseText);
                setSnackbarMessage('Item added successfully');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
                setTimeout(() => {
                    props.onFormSubmit();
                }, 1000);
            } else {
                console.error('Error:', response.statusText);
                setSnackbarMessage('Failed to add item');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
        } catch (error) {
            console.error('Error:', error);
            setSnackbarMessage('Failed to add item');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    return (
        <>
            <Grid>
                <Paper elevation={1} style={paperStyle}>
                    <Grid align='center'>
                        <h2>Add Items</h2>
                    </Grid>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            placeholder='Enter item category'
                            label='Item Category'
                            name="itemCategory"
                            variant="outlined"
                            fullWidth
                            required
                            value={itemCategory}
                            onChange={(event) => { setItemCategory(event.target.value); }}
                        />
                        <TextField
                            placeholder='Enter item description'
                            label='Item Description'
                            name="itemDescription"
                            variant="outlined"
                            fullWidth
                            required
                            value={itemDescription}
                            onChange={(event) => { setItemDescription(event.target.value); }}
                        />
                        <TextField
                            placeholder='Enter item value'
                            label='Item Value'
                            name="itemValuation"
                            variant="outlined"
                            fullWidth
                            required
                            value={itemValuation}
                            error={itemValueError}
                            onBlur={handleItemValueError}
                            onChange={(event) => { setItemValuation(event.target.value); }}
                        />
                        <InputLabel >Issue Status</InputLabel>
                        <Select
                            placeholder='Select status'
                            required
                            value={issueStatus}
                            onChange={(event) => { setIssueStatus(event.target.value); }}
                            sx={{
                                width: 400,
                                height: 40,
                            }}
                        >
                            <MenuItem value="Yes">Yes</MenuItem>
                            <MenuItem value="No">No</MenuItem>
                        </Select>
                        <TextField
                            placeholder='Enter item make'
                            label='Item Make'
                            name="itemMake"
                            variant="outlined"
                            fullWidth
                            required
                            value={itemMake}
                            onChange={(event) => { setItemMake(event.target.value); }}
                        />
                        <Button type='submit' color='primary' variant="outlined" style={btnstyle} fullWidth>Create Item</Button>

                        {/* Show Form Error if any */}
                        {formValid && (
                            <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
                                <Alert severity="error" size="small">
                                    {formValid}
                                </Alert>
                            </Stack>
                        )}
                    </form>
                </Paper>
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
    );
};

export default AddItem;