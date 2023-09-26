import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, InputAdornment, IconButton } from '@material-ui/core';
import { Stack, Alert } from "@mui/material";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const isEmail = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

const isUserName = (userName) => /^[A-Z][0-9][0-9][0-9][0-9][0-9][0-9]$/i.test(userName);

const EmployeeLogin = () => {
    const [password, setPassword] = useState();
    const [userName, setUserName] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [userNameError, setUserNameError] = useState(false);
    const [formValid, setFormValid] = useState();
    const [success, setSuccess] = useState();
    // const { role, setRole } = InfState();

    const navigate = useNavigate();

    const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" };
    const avatarStyle = { backgroundColor: '#1bbd7e' };
    const btnstyle = { margin: '8px 0' };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleUserName = () => {
        // console.log(isUserName(userName));
        if (!isUserName(userName)) {
            setUserNameError(true);
            return;
        }
        setUserNameError(false);
    }

    const handlePassword = () => {
        if (!password || password.length < 5 || password.length > 20) {
            setPasswordError(true);
            return;
        }
        setPasswordError(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(null);
        if (userNameError || !userName) {
            setFormValid("Invalid format of user name");
            return;
        }
        if (passwordError || !password) {
            setFormValid(
                "Password is set btw 5 - 20 characters long. Please Re-Enter"
            );
            return;
        }
        setFormValid(null);
        // console.log("Login success");
        // setSuccess("Form Submitted Successfully");
        const url = 'http://localhost:8080/api/employee/login'
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userName, password })
        };
        const response = await fetch(url, requestOptions);
        console.log(response);
        if (response.status == "200") {
            const data = await response.json();
            console.log(data);
            // setRole(data.role);
            localStorage.setItem('ROLE', JSON.stringify(data.role));
            localStorage.setItem('USERID', JSON.stringify(data.employeeId));
            localStorage.setItem('USERNAME', JSON.stringify(data.username));
            navigate("/home");
        } else {
            setFormValid(
                "Invalid credentials"
            );
            return;
        }
    };

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Employee Login</h2>
                </Grid>
                <form onSubmit={handleSubmit}>
                    <TextField
                        placeholder='Enter user name'
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
                        placeholder='Enter password'
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        fullWidth
                        required
                        error={passwordError}
                        value={password}
                        onBlur={handlePassword}
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
                    <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Login</Button>
                    {/* Show Form Error if any */}
                    {formValid && (
                        <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
                            <Alert severity="error" size="small">
                                {formValid}
                            </Alert>
                        </Stack>
                    )}

                    {/* Show Success if no issues */}
                    {success && (
                        <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
                            <Alert severity="success" size="small">
                                {success}
                            </Alert>
                        </Stack>
                    )}
                    <Typography> Don't have an account?<br /> Contact Admin</Typography>
                </form>
            </Paper>
        </Grid>
    );
};

export default EmployeeLogin;