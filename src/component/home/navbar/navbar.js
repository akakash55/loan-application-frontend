import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function Navbar() {
    const [admin, setAdmin] = useState(false);
    const [employee, setEmployee] = useState(false);
    const [userId, setUserId] = useState(false);
    const [userName, setUserName] = useState(false);
    const ROLE = JSON.parse(localStorage.getItem('ROLE'));
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('error');
    const navigate = useNavigate();

    const handleButtonClick = () => {
        setTimeout(() => {
            window.location.reload();
        }, 10);

    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const logOut = () => {
        localStorage.setItem('ROLE', null);
        localStorage.setItem('USERID', null);
        localStorage.setItem('USERNAME', null);
        setSnackbarMessage('Logged Out');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    useEffect(() => {
        if (ROLE === "ADMIN") {
            setAdmin(true);
        } else if (ROLE === "EMPLOYEE") {
            setEmployee(true);
        } else if (window.location.pathname !== '/home') {
            // Redirect to the home route if neither admin nor employee and not already on the home route
            window.location.href = '/home'; // Change '/home' to your actual home route
        }

    }, [ROLE]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" style={{ backgroundColor: '#497FC3' }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{ color: 'yellow' }}>
                        Loan Managment Application
                    </Typography>
                    {!admin && !employee && (
                        <>
                            <Link to="/login/admin" style={{ textDecoration: 'none' }}>
                                <Button variant="outlined" sx={{ mx: 1.5, my: 2, color: 'white', display: 'block', border: '1px solid #FFFFFF' }} onClick={handleButtonClick}>Admin Login</Button>
                            </Link>
                            <Link to="/login/employee" style={{ textDecoration: 'none' }}>
                                <Button variant="outlined" sx={{ mx: 1.5, my: 2, color: 'black', display: 'block', border: '1px solid #000000' }} onClick={handleButtonClick}>Employee Login</Button>
                            </Link>
                        </>
                    )}
                    {((!admin && employee) || (admin && !employee)) && (
                        <>
                            <Link to="/home" style={{ textDecoration: 'none' }}>
                                <Button variant="outlined" sx={{ mx: 1.5, my: 2, color: 'white', display: 'block', border: '1px solid #FFFFFF' }}>
                                    Home
                                </Button>
                            </Link>
                            <Button onClick={logOut} variant="outlined" sx={{ mx: 1.5, my: 2, color: 'white', display: 'block', border: '1px solid #FFFFFF' }}>Logout</Button>
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
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;
