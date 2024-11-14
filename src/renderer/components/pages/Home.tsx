import * as React from 'react';
import Button from '@mui/material/Button';
import { AlertSystem } from '../Alertsystem';

export function Home() {
  const { showAlert, AlertComponent } = AlertSystem();
  return (
    <div>
      <Button
        variant="contained"
        color="success"
        onClick={() => showAlert('testidata', 'success')} // message, severity
      >
        Testinappi 1
      </Button>
      <Button
        variant="outlined"
        color="info"
        onClick={() => showAlert('Tää info toimi', 'info')} // message, severity
      >
        Testinappi 2
      </Button>
      <Button
        variant="text"
        color="error"
        onClick={() => showAlert('Tää errori toimi', 'error')} // message, severity
      >
        Testinappi 3
      </Button>
      <Button
        variant="outlined"
        color="warning"
        onClick={() => showAlert('Tää warningi toimi', 'warning')} // message, severity
      >
        Testinappi 4
      </Button>
      <AlertComponent />
    </div>
  );
}
