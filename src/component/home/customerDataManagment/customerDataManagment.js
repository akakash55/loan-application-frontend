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
import { useNavigate } from 'react-router-dom';


const CustomerDataManagment = () => {
  const [value, setValue] = React.useState('view/modify customer');
  const [customerData, setCustomerData] = useState([]);
  const ROLE = JSON.parse(localStorage.getItem('ROLE'));
  const navigate = useNavigate();

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
      const response = await fetch(`http://localhost:8080/api/employee/${updatedEmployee.employeeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedEmployee),
      });
      console.log("Employee update in progress");
      if (response.ok) {
        const updatedData = await response.json();
        setCustomerData(updatedData);
        console.log('Employee updated successfully');
        navigate('/customerdatamanagment');
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
      {ROLE === 'ADMIN' ? (
        <>
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
      ) : (
        <p>Unauthorized</p>
      )}
    </>


  );
};

export default CustomerDataManagment;