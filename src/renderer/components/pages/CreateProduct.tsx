import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import placeholderlist from '../placeholderitems';
import TextField from '@mui/material/TextField';

export function CreateProduct() {
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    <div>
      <div className="returnbutton">
        <IconButton onClick={() => handleClick('/Inventory')}>
          <Typography className="returntext"> Palaa</Typography>
          <KeyboardReturnIcon></KeyboardReturnIcon>
        </IconButton>
      </div>
      <h2>Name</h2>
      <TextField id="outlined-basic" label="Name" variant="outlined" />
      <h2>Description</h2>
      <TextField
        id="outlined-basic"
        label="Description"
        variant="outlined"
        type="number"
      />
      <h2>Current Stock</h2>
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        type="number"
      />
      <h2>Total Stock</h2>
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        type="number"
      />
      <h2>Type</h2>
      <Autocomplete
        disablePortal
        options={placeholderlist} // todo: remove placeholderitems.ts when implementing proper api calls
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Item" />}
      />
    </div>
  );
}
