import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import { fetchUniqueTypes } from '../ItemTypes';
import '../css/CreateProduct.css';
import { _post, _put, _delete, _get } from '../APIconn';

export function CreateProduct() {
  const navigate = useNavigate();
  const [namevalue, setnameValue] = useState('');
  const [currentstockvalue, setcurrentstockValue] = useState('');
  const [typevalue, settypeValue] = useState('');
  const [descriptionvalue, setdescriptionValue] = useState('');
  const [totalstockvalue, settotalstockValue] = useState('');
  const [uniqueTypes, setUniqueTypes] = useState<string[]>([]);

  const handleClick = (path: string) => {
    navigate(path);
  };

  useEffect(() => {
    const fetchData = async () => {
      const types = await fetchUniqueTypes();
      setUniqueTypes(types);
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    const body = {
      name: namevalue,
      current_stock: currentstockvalue,
      type: typevalue,
      description: descriptionvalue,
      total_stock: totalstockvalue,
    };
    console.log(body);

    try {
      await _post('devices', body);
      alert('data added!');
    } catch (error) {
      console.error('Error adding data:', error);
      // Handle errors
    }
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
              options={uniqueTypes}
              sx={{ width: 300 }}
              
              freeSolo
              onInputChange={(event, newInputValue) => {
                settypeValue(newInputValue);
              }}
              onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                  settypeValue(newValue);
                } else if (
                  newValue &&
                  typeof newValue === 'object' &&
                  'label' in newValue
                ) {
                  settypeValue(newValue);
                } else {
                  settypeValue('');
                }
              }}
              value={typevalue}
              getOptionLabel={(option) => option}
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
