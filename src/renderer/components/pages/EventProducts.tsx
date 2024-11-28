import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, List, ListItemButton, Typography } from '@mui/material';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import '../css/InventoryProducts.css';
import { _get } from '../APIconn';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItem from '@mui/joy/ListItem';
import Sheet from '@mui/joy/Sheet';

interface Device {
  name: string;
  current_stock: number;
  total_stock: number;
  id: number;
  type: string;
}

export const EventProducts: React.FC = () => {
  const [device, setDevice] = useState<Device[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    _get('devices')
      .then((response) => {
        console.log('Data received:', response.data);
        if (response.data && Array.isArray(response.data)) {
          setDevice(response.data);
        } else {
          console.error('Unexpected response structure:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    <div>
      <div className="returnbutton">
        <IconButton onClick={() => handleClick('/Inventory')}>
          <Typography className="returntext"> Palaa</Typography>
          <KeyboardReturnIcon />
        </IconButton>
      </div>
      <div>
      <h2>Tapahtumissa ovat seuraavat tuotteet:</h2>
        <Sheet
          variant="outlined"
          sx={{
            width: 700,
            maxHeight: 300,
            overflow: 'auto',
            borderRadius: 'sm',
          }}
        >
            {device.map((device: Device) => {
            const inEvents = device.total_stock - device.current_stock;
            if (inEvents > 0) {
              return (
                <List key={device.id}>
                  <ListSubheader sticky>Tuotteen nimi: {device.name}</ListSubheader>
                  <List
                    sx={{
                      '--List-gap': '0px',
                      '--List-radius': '0px',
                      '--List-padding': '4px',
                      '--ListItem-minHeight': '40px',
                      '--ListItem-paddingY': '6px',
                      '--ListItem-paddingX': '12px',
                      '--ListItemDecorator-size': '40px',
                      '--ListDivider-gap': '6px',
                    }}
                  >
                    <ListItem>
                      <ListItemButton>
                        Tuotteen tyyppi: {device.type}
                      </ListItemButton>
                      <ListItemButton>
                        Tapahtumissa: {inEvents}
                      </ListItemButton>
                      <ListItemButton>
                        Yhteensä: {device.total_stock}
                      </ListItemButton>
                    </ListItem>
                  </List>
                </List>
              );
            }
            return null;
          })}
        </Sheet>
      </div>
    </div>
  );
};

export default EventProducts;
