import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, InputAdornment, IconButton } from '@material-ui/core';
import { Stack, Alert } from "@mui/material";
import { Select, MenuItem, InputLabel } from "@mui/material";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const isUserName = (userName) => /^[A-Z][0-9][0-9][0-9][0-9][0-9][0-9]$/i.test(userName);
const isEmail = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

const AddCustomer = (props) => {
    const [email, setEmail] = useState();
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState('123456');
    const [employeeName, setEmployeeName] = useState();
    const [designation, setDesignation] = useState();
    const [department, setDepartment] = useState();
    const [gender, setGender] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState(dayjs().subtract(21, 'years'));
    const [dateOfJoining, setDateOfJoining] = useState(dayjs());
    const [userNameError, setUserNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [dateOfBirthError, setDateOfBirthError] = useState(false);
    const [dateOfJoiningError, setDateOfJoiningError] = useState(false);
    const [formValid, setFormValid] = useState();
    const [success, setSuccess] = useState();

    const paperStyle = { padding: 20, height: '100vh', width: 400, margin: "20px auto" };
    const btnstyle = { margin: '8px 0' };

    const handleDateOfBirth = (date) => {
        const minAllowedDateOfBirth = dayjs().subtract(21, 'years');
        setDateOfBirth(date);
        if (date.isBefore(minAllowedDateOfBirth)) {
            setDateOfBirthError(false); // dateOfBirth is not valid
        } else {
            setDateOfBirthError(true); // dateOfBirth is valid
        }
    };

    const handleDateOfJoining = (date) => {
        const currentDate = dayjs();
        setDateOfJoining(date);
        if (date.isAfter(currentDate)) {
            setDateOfJoiningError(true); // dateOfJoining is not valid
        } else {
            setDateOfJoiningError(false); // dateOfJoining is valid
        }
    };



    const handleUserName = () => {
        console.log(isUserName(userName));
        if (!isUserName(userName)) {
            setUserNameError(true);
            return;
        }
        setUserNameError(false);
    }

    const handleEmail = () => {
        // console.log(isEmail(email));
        if (!isEmail(email)) {
            setEmailError(true);
            return;
        }
        setEmailError(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(null);
        if (userNameError || !userName) {
            setFormValid("Invalid format of user name");
            return;
        }
        if (emailError || !email) {
            setFormValid("Email is Invalid. Please Re-Enter");
            return;
        }
        if (dateOfBirthError || !dateOfBirth) {
            setFormValid("Employee cannot be less than 21 years");
            return;
        }
        if (dateOfJoiningError || !dateOfJoining) {
            setFormValid("Joining date cannot be of future");
            return;
        }
        setFormValid(null);
        console.log(userName);
        // const dobYear = dateOfBirth.year();
        // const dobMonth = dateOfBirth.month() + 1;
        // const dobDay = dateOfBirth.date();
        // const dobFormattedDate = `${dobDay}/${dobMonth}/${dobYear}`;
        // setDateOfBirth(dobFormattedDate);
        // console.log(dobFormattedDate);
        // console.log(dateOfBirth);
        // const dojYear = dateOfJoining.year();
        // const dojMonth = dateOfJoining.month() + 1;
        // const dojDay = dateOfJoining.date();
        // const dojFormattedDate = `${dojDay}/${dojMonth}/${dojYear}`;
        // setDateOfJoining(dojFormattedDate);
        // console.log(dojFormattedDate);
        // console.log(dateOfJoining);
        console.log("Added success");
        // navigate('/');
        setFormValid(null);
        const url = 'http://localhost:8080/api/employee/register'
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userName, email, password, employeeName, email, department, designation, gender, dateOfBirth, dateOfJoining })
        };
        const response = await fetch(url, requestOptions);
        console.log(response);
        if (response.status == "200") {
            const data = await response.json();
            console.log(data);
            props.onFormSubmit();
        }
    };

    return (
        <Grid>
            <Paper elevation={1} style={paperStyle}>
                <Grid align='center'>
                    <h2>Add Customer</h2>
                </Grid>
                <form onSubmit={handleSubmit}>
                    <TextField
                        placeholder='Enter user Id'
                        name="userName"
                        variant="outlined"
                        fullWidth
                        required
                        error={userNameError}
                        value={userName}
                        onBlur={handleUserName}
                        onChange={(event) => { setUserName(event.target.value); }}
                    />
                    <TextField
                        placeholder='Enter employee name'
                        name="employeeName"
                        variant="outlined"
                        fullWidth
                        required
                        value={employeeName}
                        onChange={(event) => { setEmployeeName(event.target.value); }}
                    />
                    <TextField
                        placeholder='Enter email'
                        name="email"
                        variant="outlined"
                        fullWidth
                        required
                        error={emailError}
                        value={email}
                        onBlur={handleEmail}
                        onChange={(event) => { setEmail(event.target.value); }}
                    />
                    <TextField
                        placeholder='Enter designation'
                        name="designation"
                        variant="outlined"
                        fullWidth
                        required
                        value={designation}
                        onChange={(event) => { setDesignation(event.target.value); }}
                    />
                    <TextField
                        placeholder='Enter department'
                        name="department"
                        variant="outlined"
                        fullWidth
                        required
                        value={department}
                        onChange={(event) => { setDepartment(event.target.value); }}
                    />
                    <InputLabel >Gender</InputLabel>
                    <Select
                        placeholder='Select gender'
                        required
                        value={gender}
                        onChange={(event) => { setGender(event.target.value); }}
                        sx={{
                            width: 400,
                            height: 40,
                        }}
                    >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                    </Select>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker
                                label="Date of Birth"
                                fullWidth
                                value={dateOfBirth}
                                onChange={(date) => handleDateOfBirth(date)}
                                sx={{ width: '100%' }}
                            />
                        </DemoContainer>
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker
                                label="Date of Joining"
                                fullWidth
                                value={dateOfJoining}
                                onChange={(date) => handleDateOfJoining(date)}
                                sx={{ width: '100%' }}
                            />
                        </DemoContainer>
                    </LocalizationProvider>

                    <Button type='submit' color='primary' variant="outlined" style={btnstyle} fullWidth>Add Customer</Button>

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
    );
}

export default AddCustomer;