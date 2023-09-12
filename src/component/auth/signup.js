import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, InputAdornment, IconButton } from '@material-ui/core';
import { Stack, Alert } from "@mui/material";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const isEmail = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

const isUserName = (userName) => /^[A-Z][0-9][0-9][0-9][0-9][0-9][0-9]$/i.test(userName);

function SignUp() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [userName, setUserName] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const [formValid, setFormValid] = useState();
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [userNameError, setUserNameError] = useState(false);

    const navigate = useNavigate();

    const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" };
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
        if (password != confirmPassword)
        {
            setFormValid(
                "Password and Confirm password doesnot match"
            );
            return;
        }
        console.log(userName);
        console.log(email);
        console.log(password);
        console.log("Signup success");
        navigate('/');
    };

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Sign Up</h2>
                </Grid>
                <form onSubmit={handleSubmit}>
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
                    <TextField
                        label='Confirm Password'
                        placeholder='Re-Enter the password'
                        name="confirmPassword"
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        fullWidth
                        required
                        value={confirmPassword}
                        onChange={(event) => { setConfirmPassword(event.target.value); }}
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
                    <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign Up</Button>
                    
                    {formValid && (
                        <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
                            <Alert severity="error" size="small">
                                {formValid}
                            </Alert>
                        </Stack>
                    )}
                    
                    <Typography> Do you have an account?
                        <Link to="/login">
                            Login
                        </Link>
                    </Typography>
                </form>
            </Paper>
        </Grid>
    );

}

export default SignUp;