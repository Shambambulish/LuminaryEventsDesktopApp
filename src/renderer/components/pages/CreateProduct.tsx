import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import placeholderlist from '../placeholderitems';
import '../css/CreateProduct.css';
import { useState } from 'react';
import axios from 'axios';

export function CreateProduct() {
  const navigate = useNavigate();

  const [namevalue, setnameValue] = useState('');
  const [currentstockvalue, setcurrentstockValue] = useState('');
  const [typevalue, settypeValue] = useState('');
  const [descriptionvalue, setdescriptionValue] = useState('');
  const [totalstockvalue, settotalstockValue] = useState('');

  const handleClick = (path: string) => {
    navigate(path);
  };

  const handleSubmit = () => {
    // axioksen http callin json body, menee postina apiin. todo: the postcall
    const body = {
      name: namevalue,
      currentstock: currentstockvalue,
      type: typevalue,
      description: descriptionvalue,
      totalstock: totalstockvalue,
    };

    console.log(body);
    // lisää axios callit

    // todo: errorcheck;
  };

  return (
    <div>
      <div className="returnbutton">
        <IconButton onClick={() => handleClick('/Inventory')}>
          <Typography className="returntext"> Palaa</Typography>
          <KeyboardReturnIcon />
        </IconButton>
      </div>
      <div className="gridcontainer">
        <Grid
          display="flex"
          justifyContent="center"
          alignItems="center"
          container
          spacing={8}
        >
          <Grid size="auto">
            <h2>Name</h2>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              onChange={(e) => setnameValue(e.target.value)}
              value={namevalue}
            />
            <h2>Description</h2>
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              onChange={(e) => setdescriptionValue(e.target.value)}
              value={descriptionvalue}
            />
          </Grid>
          <Grid size="auto">
            <h2>Current Stock</h2>
            <TextField
              id="outlined-basic"
              label="Number of Current Stock"
              variant="outlined"
              type="number"
              onChange={(e) => setcurrentstockValue(e.target.value)}
              value={currentstockvalue}
            />
            <h2>Total Stock</h2>
            <TextField
              id="outlined-basic"
              label="Number of Total Stock"
              variant="outlined"
              type="number"
              onChange={(e) => settotalstockValue(e.target.value)}
              value={totalstockvalue}
            />
          </Grid>
          <Grid size="auto">
            <h2>Type</h2>
            <Autocomplete
              disablePortal
              options={placeholderlist} // todo: remove placeholderitems.ts when implementing proper api calls
              sx={{ width: 300 }}
              freeSolo
              onChange={(e) => settypeValue(e.target.value)}
              value={typevalue}
              renderInput={(params) => (
                <TextField {...params} label="Item Type" />
              )}
            />
          </Grid>
          <Grid
            display="flex"
            justifyContent="center"
            size={12}
            alignItems="center"
          >
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              data printed to console log until api implementation is done
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
