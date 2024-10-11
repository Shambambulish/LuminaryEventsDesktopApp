import * as React from 'react';
import Button from '@mui/material/Button';
import { Alertsystem } from '../Alertsystem';

const handleClick = () => {
  setopen(true);
  setSeverity(event.target.getAttribute('severity'));
  setMessage(event.target.getAttribute('message'));
};

export function Home() {
  return (
    <div>
      <h2>Tää o kotisivu</h2>
      <Button
        onClick={handleClick}
        variant="outlined"
        severity="success"
        message="success"
      >
        Testinappi 1
      </Button>
      <br />
      <br />
      <Button
        onClick={handleClick}
        variant="outlined"
        severity="info"
        message="info"
      >
        Testinappi 2
      </Button>
      <br />
      <br />
      <Button
        onClick={handleClick}
        variant="outlined"
        severity="error"
        message="error"
      >
        Testinappi 3
      </Button>
      <br />
      <br />
      <Button
        onClick={handleClick}
        variant="outlined"
        severity="warning"
        message="warning"
      >
        Testinappi 4
      </Button>
      <Alertsystem></Alertsystem>
    </div>
  );
}
