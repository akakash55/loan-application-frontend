import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const AdminHome = () => {
    const handleButtonClick = () => {
        setTimeout(() => {
            window.location.reload();
        }, 10);

    };
    return (
        <Grid container spacing={2} sx={{ padding: 15 }}>
            <Grid item xs={12} md={4}>
                <Card sx={{ mx: 3, my: 10, width: 250 }}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            Customer Data Managment
                        </Typography>
                        <Typography sx={{ my: 2, mb: 1.5 }} color="text.secondary">
                            Efficiently organize and<br /> maintain customer data<br /> for better service and insights
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Link to="/customerdatamanagment" style={{ textDecoration: 'none' }}>
                            <Button variant="outlined" sx={{ mx: 1.5, my: 2, color: '#2E3B55' }} onClick={handleButtonClick}>
                                Customer Data Managment
                            </Button>
                        </Link>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card sx={{ mx: 3, my: 10, width: 250 }}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            Loan Card Managment
                        </Typography>
                        <Typography sx={{ my: 2, mb: 1.5 }} color="text.secondary">
                            Streamline and oversee<br /> loan card management for a<br /> more efficient lending process
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Link to="/loancardmanagment" style={{ textDecoration: 'none' }}>
                            <Button variant="outlined" sx={{ mx: 1.5, my: 2, color: '#2E3B55' }} onClick={handleButtonClick}>
                                Loan Card Managment
                            </Button>
                        </Link>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card sx={{ mx: 3, my: 10, width: 250 }}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            Items Master Data
                        </Typography>
                        <Typography sx={{ my: 2, mb: 1.5 }} color="text.secondary">
                            Centralize and maintain<br /> comprehensive item master data<br /> for enhanced inventory control
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Link to="/itemsmasterlist" style={{ textDecoration: 'none' }}>
                            <Button variant="outlined" sx={{ mx: 1.5, my: 2, color: '#2E3B55' }} onClick={handleButtonClick}>
                                Items Master Data
                            </Button>
                        </Link>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    );
}

export default AdminHome;