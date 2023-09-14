import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Grid from '@mui/material/Grid';
import AddCustomer from './addCustomer';

const CustomerDataManagment = () => {
  const [value, setValue] = React.useState('add customer');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
    <Grid container spacing={2} sx={{ padding: 15 }}>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Add Customer" value="add customer" sx={{ mx: 2 }} />
              <Tab label="View/Modify Customer" value="view/modify customer" sx={{ mx: 2 }} />
            </TabList>
          </Box>
          <TabPanel value="add customer">{<AddCustomer />}</TabPanel>
          <TabPanel value="view/modify customer">View/Modify Customer</TabPanel>
        </TabContext>
      </Box>
    </Grid >


  );
};

export default CustomerDataManagment;