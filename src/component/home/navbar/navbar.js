import React from 'react';
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

function Navbar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" style={{ backgroundColor: '#497FC3' }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{ color: 'yellow' }}>
                        Wells Fargo
                    </Typography>
                    <Link to="/login/admin" style={{ textDecoration: 'none' }}>
                        <Button sx={{ mx: 1.5, my: 2, color: 'white', display: 'block' }}>Admin Login</Button>
                    </Link>
                    <Link to="/login/employee" style={{ textDecoration: 'none' }}>
                        <Button sx={{ mx: 1.5, my: 2, color: 'black', display: 'block' }}>Employee Login</Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;