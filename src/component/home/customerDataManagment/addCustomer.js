import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, InputAdornment, IconButton } from '@material-ui/core';
import { Stack, Alert } from "@mui/material";
import { Select, MenuItem, InputLabel } from "@mui/material";
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import AdapterDayjs from '@mui/lab/AdapterDayjs';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DatePicker from '@mui/lab/DatePicker';

const isEmail = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

const isUserName = (userName) => /^[A-Z][0-9][0-9][0-9][0-9][0-9][0-9]$/i.test(userName);

const AddCustomer = (props) => {
    const [email, setEmail] = useState();
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState('123456');
    const [employeeName, setEmployeeName] = useState();
    const [designation, setDesignation] = useState();
    const [department, setDepartment] = useState();
    const [gender, setGender] = useState("");
    const [formValid, setFormValid] = useState();
    const [emailError, setEmailError] = useState(false);
    const [userNameError, setUserNameError] = useState(false);

    const paperStyle = { padding: 20, height: '80vh', width: 400, margin: "20px auto" };
    const avatarStyle = { backgroundColor: '#1bbd7e' };
    const btnstyle = { margin: '8px 0' };

    const handleUserName = () => {
        console.log(isUserName(userName));
        if (!isUserName(userName)) {
            setUserNameError(true);
            return;
        }
        setUserNameError(false);
    }

    const handleEmail = () => {
        console.log(isEmail(email));
        if (!isEmail(email)) {
            setEmailError(true);
            return;
        }
        setEmailError(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userNameError || !userName) {
            setFormValid("Invalid format of user name");
            return;
        }
        // if (emailError || !email) {
        //     setFormValid("Email is Invalid. Please Re-Enter");
        //     return;
        // }
        console.log(userName);
        console.log(email);
        console.log("Added success");
        // navigate('/');
        setFormValid(null);
        const url = 'http://localhost:8080/api/employee/register'
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userName, email, password, employeeName, department, designation, gender })
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
                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker label="Basic date picker" />
                        </DemoContainer>
                    </LocalizationProvider> */}
                    <Button type='submit' color='primary' variant="outlined" style={btnstyle} fullWidth>Add Customer</Button>

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