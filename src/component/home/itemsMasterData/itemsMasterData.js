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

  const [value, setValue] = React.useState('add item');
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

  return (
    <>
      <Navbar />
      <Grid container spacing={2} sx={{ padding: 20 }}>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange}>
                <Tab label="Add Item" value="add item" sx={{ mx: 2 }} />
                <Tab label="View/Modify Item" value="view/modify item" sx={{ mx: 2 }} />
              </TabList>
            </Box>
            <TabPanel value="add item">{<AddItem />}</TabPanel>
            <TabPanel value="view/modify item">{<ViewItems itemList={itemList} />}</TabPanel>
          </TabContext>
        </Box>
      </Grid >
    </>
  );
};

export default ItemsMasterList;