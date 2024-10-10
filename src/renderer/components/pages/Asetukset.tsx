import { Checkbox } from "@mui/material";
import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import "../css/Asetukset.css"


export function Asetukset() {

  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);  
  }



    return (
      <div>
        <div className="settingcontainer">
          <div className="settings">
            <FormControlLabel label="Asetus 1"
            value="asetus1" control={<Checkbox checked={checked} 
            onChange={handleChange} />}></FormControlLabel>
          </div>
        </div>
      </div>
    );
  }
  