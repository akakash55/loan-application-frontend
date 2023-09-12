import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, InputAdornment, IconButton } from '@material-ui/core';
import { Stack, Alert } from "@mui/material";
import { Select, MenuItem, InputLabel } from "@mui/material";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const isEmail = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

const isUserName = (userName) => /^[A-Z][0-9][0-9][0-9][0-9][0-9][0-9]$/i.test(userName);

function SignUp() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [userName, setUserName] = useState();
    const [employeeName, setEmployeeName] = useState();
    const [designation, setDesignation] = useState();
    const [department, setDepartment] = useState();
    const [gender, setGender] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [formValid, setFormValid] = useState();
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [userNameError, setUserNameError] = useState(false);

    const navigate = useNavigate();

    const paperStyle = { padding: 20, height: '120vh', width: 400, margin: "20px auto" };
    const avatarStyle = { backgroundColor: '#1bbd7e' };
    const btnstyle = { margin: '8px 0' };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
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
        console.log(isEmail(email));
        if (!isEmail(email)) {
            setEmailError(true);
            return;
        }
        setEmailError(false);
    };

    const handlePassword = () => {
        if (!password || password.length < 5 || password.length > 20) {
            setPasswordError(true);
            return;
        }
        setPasswordError(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userNameError || !userName) {
            setFormValid("Invalid format of user name");
            return;
        }
        if (emailError || !email) {
            setFormValid("Email is Invalid. Please Re-Enter");
            return;
        }
        if (passwordError || !password) {
            setFormValid(
                "Password is set btw 5 - 20 characters long. Please Re-Enter"
            );
            return;
        }
        if (password != confirmPassword) {
            setFormValid(
                "Passwords does not match"
            );
            return;
        }
        // console.log(userName);
        // console.log(email);
        // console.log(password);
        // console.log("Signup success");
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
    };

    return (
        <Grid container spacing={2}>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Sign Up</h2>
                </Grid>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label='EmployeeName'
                        placeholder='Enter your name'
                        name="employeeName"
                        variant="outlined"
                        fullWidth
                        required
                        value={employeeName}
                        onChange={(event) => { setEmployeeName(event.target.value); }}
                    />
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                        <TextField
                            label='Designation'
                            placeholder='Enter your designation'
                            name="designation"
                            variant="outlined"
                            fullWidth
                            required
                            value={designation}
                            onChange={(event) => { setDesignation(event.target.value); }}
                        />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                        <TextField
                            label='Department'
                            placeholder='Enter your department'
                            name="department"
                            variant="outlined"
                            fullWidth
                            required
                            value={department}
                            onChange={(event) => { setDepartment(event.target.value); }}
                        />
                    </Grid>
                    <InputLabel >Gender</InputLabel>
                    <Select
                        required
                        value={gender}
                        onChange={(event) => { setGender(event.target.value); }}
                        sx={{
                            width: 400,
                            height: 50,
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
                    <TextField
                        label='User Name'
                        placeholder='Enter user name'
                        name="userName"
                        variant="outlined"
                        fullWidth
                        required
                        value={userName}
                        onBlur={handleUserName}
                        onChange={(event) => { setUserName(event.target.value); }}
                    />
                    <TextField
                        label='Email'
                        placeholder='Enter email'
                        name="email"
                        variant="outlined"
                        fullWidth
                        required
                        value={email}
                        onBlur={handleEmail}
                        onChange={(event) => { setEmail(event.target.value); }}
                    />
                    <TextField
                        label='Password'
                        placeholder='Enter password'
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        fullWidth
                        required
                        value={password}
                        onChange={(event) => { setPassword(event.target.value); }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleShowPassword}>
                                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label='Confirm Password'
                        placeholder='Re-Enter the password'
                        name="confirmPassword"
                        type={password}
                        variant="outlined"
                        fullWidth
                        required
                        value={confirmPassword}
                        onChange={(event) => { setConfirmPassword(event.target.value); }}
                    />
                    <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign Up</Button>

                    {formValid && (
                        <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
                            <Alert severity="error" size="small">
                                {formValid}
                            </Alert>
                        </Stack>
                    )}

                    <Typography> Do you have an account?
                        <Link href="/login" aria-label="Login Link">
                            Log In
                        </Link>
                    </Typography>
                </form>
            </Paper>
        </Grid>
    );

}

export default SignUp;