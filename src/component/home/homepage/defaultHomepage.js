import React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const DefaultHomePage = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh', // Adjust the height as needed
            }}
        >
            <Card sx={{ width: 500 }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Customer Data Management
                    </Typography>
                    <Typography sx={{ my: 2, mb: 1.5 }} color="text.secondary">
                        Efficiently organize and<br /> maintain customer data<br /> for better service and insights
                    </Typography>
                </CardContent>
                <CardActions>
                    <Link to="/customerdatamanagment" style={{ textDecoration: 'none' }}>
                        <Button variant="outlined" sx={{ mx: 1.5, my: 2, color: '#2E3B55' }}>
                            Customer Data Management
                        </Button>
                    </Link>
                </CardActions>
            </Card>
        </div>
    );
}

export default DefaultHomePage;
