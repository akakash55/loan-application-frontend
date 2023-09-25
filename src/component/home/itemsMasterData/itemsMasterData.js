import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Grid from '@mui/material/Grid';
import Navbar from '../navbar/navbar';
import AddItem from './addItem';
import ViewItems from './viewItems';

const ItemsMasterList = () => {
  const ROLE = JSON.parse(localStorage.getItem('ROLE'));
  const [value, setValue] = React.useState('view/modify item');
  const [itemList, setItemList] = useState([]);

  const fetchData = async () => {
    const url = 'http://localhost:8080/api/item/all';
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      setItemList(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [])
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  const handleFormSubmit = () => {
    setValue('view/modify item');
    fetchData();
  };

  const handleDeleteClick = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/item/${itemId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Update the UI by filtering out the deleted employee from the data
      setItemList((prevData) =>
        prevData.filter((employee) => employee.itemId !== itemId)
      );
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleUpdateItem = async (updatedItem) => {
    try {
      const response = await fetch(`http://localhost:8080/api/item/${updatedItem.itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setItemList(updatedData);
        console.log('item updated successfully');
      } else {
        console.error('Failed to update item');
      }
    } catch (error) {
      console.error('Error updating item:', error);
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
                    <Tab label="Add Item" value="add item" sx={{ mx: 2 }} />
                    <Tab label="View/Modify Item" value="view/modify item" sx={{ mx: 2 }} />
                  </TabList>
                </Box>
                <TabPanel value="add item">{<AddItem onFormSubmit={handleFormSubmit} />}</TabPanel>
                <TabPanel value="view/modify item">{<ViewItems itemList={itemList} onDeleteClick={handleDeleteClick} onUpdateClick={handleUpdateItem} />}</TabPanel>
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

export default ItemsMasterList;