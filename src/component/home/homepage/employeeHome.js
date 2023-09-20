import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const EmployeeHome = () => {
    return (
        <Grid container spacing={2} sx={{ padding: 15 }}>
            <Grid item xs={12} md={4}>
                <Card sx={{ mx: 3, my: 10, width: 250 }}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            View Loans
                        </Typography>
                        <Typography sx={{ my: 2, mb: 1.5 }} color="text.secondary">
                            Review and manage<br /> your loans at a glance
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Link to="/viewloan" style={{ textDecoration: 'none' }}>
                            <Button variant="outlined" sx={{ mx: 1.5, my: 2, color: '#2E3B55' }}>
                                View Loans
                            </Button>
                        </Link>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card sx={{ mx: 3, my: 10, width: 250 }}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            Apply for Loan
                        </Typography>
                        <Typography sx={{ my: 2, mb: 1.5 }} color="text.secondary">
                            Apply for loans<br /> with ease and convenience
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Link to="/applyloan" style={{ textDecoration: 'none' }}>
                            <Button variant="outlined" sx={{ mx: 1.5, my: 2, color: '#2E3B55' }}>
                                Apply for Loan
                            </Button>
                        </Link>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card sx={{ mx: 3, my: 10, width: 250 }}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            View Items Purchased
                        </Typography>
                        <Typography sx={{ my: 2, mb: 1.5 }} color="text.secondary">
                            Track your purchased<br /> items at a glance
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Link to="/itemspurchased" style={{ textDecoration: 'none' }}>
                            <Button variant="outlined" sx={{ mx: 1.5, my: 2, color: '#2E3B55' }}>
                                View Items Purchased
                            </Button>
                        </Link>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    );
}

export default EmployeeHome;