import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, InputAdornment, IconButton } from '@material-ui/core';
import { Stack, Alert } from "@mui/material";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

const Login = () => {
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const [userNameError, setUserNameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [formValid, setFormValid] = useState();
    const [success, setSuccess] = useState();

    const navigate = useNavigate();

    const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" };
    const avatarStyle = { backgroundColor: '#1bbd7e' };
    const btnstyle = { margin: '8px 0' };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleUserName = () => {
        console.log(isEmail(userName));
        if (!isEmail(userName)) {
            setUserNameError(true);
            return;
        }
        setUserNameError(false);
    };

    const handlePassword = () => {
        if (!password || password.length < 5 || password.length > 20) {
            setPasswordError(true);
            return;
        }
        setPasswordError(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccess(null);
        if (userNameError || !userName) {
            setFormValid("Email is Invalid. Please Re-Enter");
            return;
        }
        if (passwordError || !password) {
            setFormValid(
                "Password is set btw 5 - 20 characters long. Please Re-Enter"
            );
            return;
        }
        setFormValid(null);
        console.log(userName);
        console.log(password);
        console.log("Login success");
        setSuccess("Form Submitted Successfully");
        navigate('/');
    };

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Login</h2>
                </Grid>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label='Username'
                        placeholder='Enter username'
                        name="userName"
                        variant="outlined"
                        fullWidth
                        required
                        error={userNameError}
                        value={userName}
                        onBlur={handleUserName}
                        onChange={(event) => {setUserName(event.target.value);}}
                    />
                    <TextField
                        label='Password'
                        placeholder='Enter password'
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        fullWidth
                        required
                        error={passwordError}
                        value={password}
                        onBlur={handlePassword}
                        onChange={(event) => {setPassword(event.target.value);}}
                        onClick={handleShowPassword}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton >
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
                    <Typography> Do you have an account?
                        <Link href="#" aria-label="Sign Up Link">
                            Sign Up
                        </Link>
                    </Typography>
                </form>
            </Paper>
        </Grid>
    );
};

export default Login;