import React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import "../css/Asetukset.css"

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
    </div>
  );
}
