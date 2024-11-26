import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { _get, _delete } from '../APIconn'; // Ensure these are correctly implemented
import { luminary } from '../Theme';
import '../css/Home.css';

export function Home() {
  interface Device {
    name: string;
    current_stock: number;
    total_stock: number;
    id: number;
    type: string;
  }
  const [data, setData] = useState([]);

  const deleteData = async (id: number) => {
    try {
      await _delete(`orders/${id}`);
      console.log("Data Deleted");
      fetchData(); // Refresh data after deleting
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const fetchData = async () => {
    try {
    
      const response = await _get('orders', { headers: { Authorization: `Bearer` } });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Fetch data on component mount

  return (
    <Box
      className="container"
      sx={{
        backgroundColor: luminary.palette.primary.main,
        padding: '16px',
      }}
    >
      <Box className="calendarinfo">
      <p> Tulevat Tapahtumat </p>
        {data.length > 0 ? (
          data.map((item) => (
            <div className="eventinfo" key={item.id}>
              <p>{item.customer_name}</p>
              <p>{item.order_start_date}</p>
              <p>{item.message}</p>
              <Button>Edit</Button>
              <Button onClick={() => deleteData(item.id)}>Delete</Button>
            </div>
          ))
        ) : (
          <p>Error Occured.</p>
        )}
      </Box>
    </Box>
  );
}
