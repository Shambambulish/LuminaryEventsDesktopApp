import React from 'react';
import { Button, Checkbox, FormControlLabel, ThemeProvider, Typography, useTheme } from '@mui/material';
import "../css/Settings.css"
import { luminary } from '../Theme';

export function Settings() {
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
        <ThemeProvider theme={luminary}>
        <Button
        variant="contained"
        style={{
          backgroundColor: luminary.palette.primary.dark,
        }}
      >RAYH</Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: luminary.palette.primary.main,
          }}
        >
         <Typography color={luminary.palette.secondaryContrastText}> RAYH2 </Typography>
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: luminary.palette.lumBlue,
          }}
        >
         <Typography color={luminary.palette.secondaryContrastText}> RÖÖÖÖH </Typography>
        </Button>
        </ThemeProvider>
    </div>
  );
}
