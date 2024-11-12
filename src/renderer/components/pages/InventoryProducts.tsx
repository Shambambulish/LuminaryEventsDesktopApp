import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Typography } from '@mui/material';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import '../css/InventoryProducts.css';
import { _get } from '../APIconn';

interface Device {
  name: string;
  current_stock: number;
  id: number;
  type: string;
}

export const InventoryProducts: React.FC = () => {
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
        <h2>Täällä on varaston tuotteet</h2>
        <ul className="tekstii">
          {device.map((device: Device) => (
            <li key={device.id}>
              {device.current_stock} kpl: {device.name} tyyppiä {device.type}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InventoryProducts;
