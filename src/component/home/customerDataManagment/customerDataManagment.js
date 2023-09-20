import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Grid from '@mui/material/Grid';
import AddCustomer from './addCustomer';
import ViewCustomer from './viewCustomer';
import Navbar from '../navbar/navbar';


const CustomerDataManagment = () => {
  const [value, setValue] = React.useState('add customer');
  const [customerData, setCustomerData] = useState([]);

  const fetchData = async () => {
    const url = 'http://localhost:8080/api/employee/all';
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log(response);
      const data = await response.json();
      console.log(data);
      setCustomerData(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
    console.log("Data is getting fetched");
  }, [])
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
    <>
      <Navbar />
      <Grid container spacing={2} sx={{ padding: 20 }}>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange}>
                <Tab label="Add Customer" value="add customer" sx={{ mx: 2 }} />
                <Tab label="View/Modify Customer" value="view/modify customer" sx={{ mx: 2 }} />
              </TabList>
            </Box>
            <TabPanel value="add customer">{<AddCustomer />}</TabPanel>
            <TabPanel value="view/modify customer">{<ViewCustomer customerData={customerData} />}</TabPanel>
          </TabContext>
        </Box>
      </Grid >
    </>


  );
};

export default CustomerDataManagment;