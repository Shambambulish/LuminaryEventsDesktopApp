import React from 'react';
import { Button, Checkbox, FormControlLabel, ThemeProvider, Typography, useTheme } from '@mui/material';
import "../css/Asetukset.css"
import { teema12 } from '../theme';

export function Asetukset() {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };


  return (
 
      <div className="settingcontainer">
        <div className="settings">
          <FormControlLabel
            label="Asetus 1"
            value="asetus1"
            control={<Checkbox checked={checked} onChange={handleChange} />}
          />
        </div>
        <ThemeProvider theme={teema12}>
        <Button
        variant="contained"
        style={{
          backgroundColor: teema12.palette.primary.dark,
        }}
      >RAYH</Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: teema12.palette.primary.main,
          }}
        >
         <Typography color={teema12.palette.secondary.contrastText}> RAYH2 </Typography>
        </Button>
        </ThemeProvider>
    </div>
  );
}
