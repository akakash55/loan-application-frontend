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
  const handleFormSubmit = () => {
    setValue('view/modify customer');
    fetchData();
  };
  const handleDeleteClick = async (employeeId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/employee/${employeeId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Update the UI by filtering out the deleted employee from the data
      setCustomerData((prevData) =>
        prevData.filter((employee) => employee.employeeId !== employeeId)
      );
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleUpdateEmployee = async (updatedEmployee) => {
    try {
      const response = await fetch('your_update_endpoint', {
        method: 'PUT', // You can use 'PUT' or 'PATCH' depending on your API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEmployee),
      });

      if (response.ok) {
        // If the update was successful, update the UI with the updated data
        // You can fetch the updated data from the server or update the local state here
        // For example, refetch customerData:
        const updatedData = await response.json();
        setCustomerData(updatedData);
        // Close the edit dialog if needed
        // ... code to close the dialog ...

        console.log('Employee updated successfully');
      } else {
        console.error('Failed to update employee');
      }
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

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
            <TabPanel value="add customer">{<AddCustomer onFormSubmit={handleFormSubmit} />}</TabPanel>
            <TabPanel value="view/modify customer">{<ViewCustomer customerData={customerData} onDeleteClick={handleDeleteClick} onUpdateClick={handleUpdateEmployee} />}</TabPanel>
          </TabContext>
        </Box>
      </Grid >
    </>


  );
};

export default CustomerDataManagment;