import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, InputAdornment, IconButton } from '@material-ui/core';
import { Stack, Alert } from "@mui/material";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';



const EmployeeLogin = () => {
    const [password, setPassword] = useState();
    const [userName, setUserName] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('error');

    const navigate = useNavigate();

    const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" };
    const avatarStyle = { backgroundColor: '#1bbd7e' };
    const btnstyle = { margin: '8px 0' };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = 'http://localhost:8080/api/employee/login'
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userName, password })
            };
            const response = await fetch(url, requestOptions);
            console.log(response);

            if (response.status === 200) {
                const data = await response.json();
                console.log(data);
                localStorage.setItem('ROLE', JSON.stringify(data.role));
                localStorage.setItem('USERID', JSON.stringify(data.employeeId));
                localStorage.setItem('USERNAME', JSON.stringify(data.userName));
                localStorage.setItem('DESIGNATION', JSON.stringify(data.designation));
                localStorage.setItem('DEPARTMENT', JSON.stringify(data.department));
                setSnackbarSeverity('success');
                setSnackbarMessage('Login successful');
                setSnackbarOpen(true);
                setTimeout(() => {
                    navigate("/home");
                }, 2000);
            } else {
                setSnackbarSeverity('error');
                setSnackbarMessage('Invalid credentials');
                setSnackbarOpen(true);
            }
        } catch (error) {
            console.error('Error:', error);
            setSnackbarSeverity('error');
            setSnackbarMessage('An error occurred. Please try again.')
            setSnackbarOpen(true);
        }
    };

    return (
        <>
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
                            value={userName}
                            onChange={(event) => { setUserName(event.target.value); }}
                        />
                        <TextField
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
                        <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Login</Button>
                        <Typography> Don't have an account?<br /> Contact Admin</Typography>
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

export default EmployeeLogin;