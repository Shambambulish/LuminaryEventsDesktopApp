import React from 'react';
import { Button, Checkbox, FormControlLabel, ThemeProvider } from '@mui/material';
import "../css/Asetukset.css"
import { teema12 } from '../theme';

export function Asetukset() {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };


  return (
 
      <div className="settingcontainer">
           <ThemeProvider theme={teema12}>
        <div className="settings">
          <FormControlLabel
            label="Asetus 1"
            value="asetus1"
            control={<Checkbox checked={checked} onChange={handleChange} />}
          />
        </div>
        <Button
        variant="contained"
        color="primary"
      >RAYH</Button>
        </ThemeProvider>
    </div>
  );
}
