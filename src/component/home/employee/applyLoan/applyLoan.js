import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, InputAdornment, IconButton } from '@material-ui/core';
import Checkbox from '@mui/material/Checkbox';
import { Stack, Alert } from "@mui/material";
import { Select, MenuItem, InputLabel } from "@mui/material";
import Navbar from '../../navbar/navbar';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import AdapterDayjs from '@mui/lab/AdapterDayjs';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DatePicker from '@mui/lab/DatePicker';

const isEmail = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

const isUserName = (userName) => /^[A-Z][0-9][0-9][0-9][0-9][0-9][0-9]$/i.test(userName);

const ApplyLoan = () => {
    const [amount, setAmount] = useState();
    const [itemId, setItemId] = useState();
    const [duration, setDuration] = useState();
    const [itemList, setItemList] = useState();
    const [employeeId, setEmployeeId] = useState();
    const [userName, setUserName] = useState();
    const [admin, setAdmin] = useState(false);
    const [employee, setEmployee] = useState(false);
    const [loanOrNot, setLoanOrNot] = React.useState(false);
    const [amountError, setAmountError] = useState(false);
    const [durationError, setDurationError] = useState(false);
    const [formValid, setFormValid] = useState();
    const [success, setSuccess] = useState();
    const ROLE = JSON.parse(localStorage.getItem('ROLE'));
    const navigate = useNavigate();

    const fetchCategory = async () => {
        const url = 'http://localhost:8080/api/item/all';
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
            setItemList(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, [])

    const handleAmountError = () => {
        if (!amount || amount < 0) {
            setAmountError(true);
            return;
        }
        setAmountError(false);
    };

    const handleDurationError = () => {
        if (!duration || duration <= 0) {
            setDurationError(true);
            return;
        }
        setDurationError(false);
    };

    useEffect(() => {
        if (ROLE === "ADMIN") {
            setAdmin(true);
        } else if (ROLE === "EMPLOYEE") {
            setEmployee(true);
            setEmployeeId(parseInt(JSON.parse(localStorage.getItem('USERID'))))
            setUserName(JSON.parse(localStorage.getItem('USERNAME')))
        }
    }, [ROLE]);

    const paperStyle = { padding: 20, height: '80vh', width: 400, margin: "20px auto" };
    const btnstyle = { margin: '8px 0' };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(null);
        if (amountError || !amount) {
            setFormValid("Amount cannot be negative");
            return;
        }
        if (durationError || !duration) {
            setFormValid("Duration cannot be negative or zero");
            return;
        }
        setFormValid(null);
        if (loanOrNot) {
            setItemId();
        }
        console.log(employeeId);
        console.log(itemId);
        console.log(amount);
        console.log(duration);
        console.log("Loan applied successfully");
        const url = 'http://localhost:8080/api/transaction/create'
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount, employeeId, itemId, duration, loanOrNot })
        };
        const response = await fetch(url, requestOptions);
        console.log(response);
        const data = await response.json();
        console.log(data);
        navigate('/viewloan');
    };

    return (
        <>
            {/* <Navbar /> */}
            {employee && (
                <>
                    <Grid sx={{ marginTop: 30 }} >
                        <Paper elevation={1} style={paperStyle} sx={{ padding: 20 }}>
                            <Grid align='center'>
                                <h2>Select Product and apply for Loan</h2>
                            </Grid>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    placeholder='Enter employee Id'
                                    name="userName"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    disabled="true"
                                    value={userName}
                                    // onBlur={handleUserName}
                                    onChange={(event) => { setUserName(event.target.value); }}
                                />
                                {itemList && (
                                    <>
                                        <InputLabel>Item Category</InputLabel>
                                        <Select
                                            placeholder='Select Category'
                                            disabled={loanOrNot}
                                            required
                                            value={itemId || ''}
                                            onChange={(event) => {
                                                const selectedCategory = event.target.value;
                                                setItemId(selectedCategory);
                                                const selectedCategoryItem = itemList.find((item) => item.itemId === selectedCategory);
                                                if (selectedCategoryItem) {
                                                    setAmount(selectedCategoryItem.itemValuation);
                                                } else {
                                                    setAmount('');
                                                }
                                            }}
                                            sx={{
                                                width: 400,
                                                height: 45,
                                            }}
                                        >
                                            {itemList.map((row) => (
                                                <MenuItem value={row.itemId} key={row.itemId}>
                                                    {row.itemDescription}
                                                </MenuItem>
                                            ))}
                                        </Select>

                                    </>
                                )}
                                <div>
                                    <Checkbox
                                        checked={loanOrNot}
                                        onChange={(event) => { setLoanOrNot(event.target.checked); }}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                    <span>Apply for normal Loan</span>
                                </div>
                                <TextField
                                    placeholder='Amount'
                                    name="amount"
                                    variant="outlined"
                                    type="number"
                                    fullWidth
                                    disabled={!loanOrNot}
                                    required
                                    value={amount}
                                    error={amountError}
                                    onBlur={handleAmountError}
                                    onChange={(event) => { setAmount(event.target.value); }}
                                />
                                <TextField
                                    placeholder='Duration'
                                    name="duration"
                                    variant="outlined"
                                    type="number"
                                    fullWidth
                                    required
                                    value={duration}
                                    error={durationError}
                                    onBlur={handleDurationError}
                                    onChange={(event) => { setDuration(event.target.value); }}
                                />
                                <Button type='submit' color='primary' variant="outlined" style={btnstyle} fullWidth>Apply Loan</Button>

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
                </>
            )}
        </>
    );
}

export default ApplyLoan;