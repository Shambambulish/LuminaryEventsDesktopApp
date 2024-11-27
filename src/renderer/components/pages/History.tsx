import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, List, ListItemButton, Typography } from '@mui/material';
import '../css/History.css';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItem from '@mui/joy/ListItem';
import Sheet from '@mui/joy/Sheet';
import dayjs from 'dayjs';
import { _get } from '../APIconn';

dayjs.locale('fi-FI');

export function History() {
  const navigate = useNavigate();
  const [History, setHistory] = useState<History[]>([]);

  const handleClick = (path: string) => {
    navigate(path);
  };
  interface History {
    deviceID: string;
    listed_change: string;
    time_changed: string;
    id: number;
  }

  useEffect(() => {
    _get('history')
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          setHistory(response.data);
        } else {
          console.error('Unexpected response structure:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <div className="returnbutton">
        <IconButton onClick={() => handleClick('/Inventory')}>
          <Typography className="returntext"> Palaa</Typography>
          <KeyboardReturnIcon />
        </IconButton>
      </div>
      <div>
        <h2>Tuotteiden muutoshistoria:</h2>
        <Sheet
          variant="outlined"
          sx={{
            width: 700,
            maxHeight: 300,
            overflow: 'auto',
            borderRadius: 'sm',
          }}
        >
          {History.map((History: History) => (
            <List sx={{ wrap: true, width: 1, height: 1 }}>
              <ListSubheader sticky>Muutos: {History.id}</ListSubheader>
              <List>
                <ListItem key={History.id}>
                  <ListItemButton>
                    Tuotteen laiteID:
                    <br />
                    {History.deviceID}
                  </ListItemButton>
                  <ListItemButton>
                    Listattu muutos:
                    <br />
                    {History.listed_change}
                  </ListItemButton>
                  <ListItemButton>
                    Muutosaika:
                    <br />
                    {dayjs(History.time_changed).format('LLL')}
                  </ListItemButton>
                </ListItem>
              </List>
            </List>
          ))}
        </Sheet>
      </div>
    </div>
  );
}
