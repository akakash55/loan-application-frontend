import React, { useState } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, InputAdornment, IconButton } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const initialState = { userName: '', password: '' };

const Login = () => {
    const [form, setForm] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" };
    const avatarStyle = { backgroundColor: '#1bbd7e' };
    const btnstyle = { margin: '8px 0' };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form.userName);
        console.log(form.password);
        console.log("Login success");
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
                        onChange={handleChange}
                    />
                    <TextField
                        label='Password'
                        placeholder='Enter password'
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        fullWidth
                        required
                        onChange={handleChange}
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
                    <Button type='submit' disabled={!form.userName ? (!form.password ? true : false) : (!form.password ? true : false)} color='primary' variant="contained" style={btnstyle} fullWidth>Login</Button>
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
