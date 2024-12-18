import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import "../css/AllProducts.css"
import React, { useState } from 'react';

export function AllProducts() {

  const navigate = useNavigate();

  const [menuValues, setMenuValues] = React.useState({
    menu1: '',
    menu2: '',
    menu3: ''
  });

  const handleChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setMenuValues({
      ...menuValues,
      [name]: value
    });
  };
  
  const handleClick = (path: string) => {
    navigate(path);
  };

    return (
      <div>
        <div className='returnbutton'>
      <IconButton onClick={() => handleClick('/Inventory')}>
        <Typography className='returntext'> Palaa</Typography><KeyboardReturnIcon></KeyboardReturnIcon>
      </IconButton>
      </div>
      <div className='storage'>
        <div>
          <Typography className='storageheader'>Kaikki tuotteet</Typography>
        </div>
        <div>
      <FormControl sx={{ m: 3, minWidth: 350 }}>
      <InputLabel id="menu1-label" sx={{ color: 'white' }}>Valitse tuote</InputLabel>
        <Select
          name="menu1"
          value={menuValues.menu1}
          onChange={handleChange}
          sx={{ color: 'white' }}
        >
          <MenuItem value="">
            <em>Tyhjä</em>
          </MenuItem>
          <MenuItem value="valot">Valot</MenuItem>
          <MenuItem value="kaiuttimet">Kaiuttimet</MenuItem>
          <MenuItem value="kuulokkeet">Kuulokkeet</MenuItem>
        </Select>
      </FormControl>
      {menuValues.menu1 === 'valot' && (
        <div>
          <p className='detail'>Täällä on tietoa valoista</p>
        </div>
      )}
      {menuValues.menu1 === 'kaiuttimet' && (
        <div>
          <p className='detail'>Täällä on tietoa kaiuttimista</p>
        </div>
      )}
      {menuValues.menu1 === 'kuulokkeet' && (
        <div>
          <p className='detail'>Täällä on tietoa kuulokkeista</p>
        </div>
        )}
      </div>
      <div>
      <FormControl sx={{ m: 3, minWidth: 350 }}>
      <InputLabel id="menu2-label" sx={{ color: 'white' }}>Valitse tuote</InputLabel>
        <Select
          name="menu2"
          value={menuValues.menu2}
          onChange={handleChange}
          sx={{ color: 'white' }}
        >
          <MenuItem value="">
            <em>Tyhjä</em>
          </MenuItem>
          <MenuItem value="valot">Valot</MenuItem>
          <MenuItem value="kaiuttimet">Kaiuttimet</MenuItem>
          <MenuItem value="kuulokkeet">Kuulokkeet</MenuItem>
        </Select>
      </FormControl>
      {menuValues.menu2 === 'valot' && (
        <div>
          <p className='detail'>Täällä on tietoa valoista</p>
        </div>
      )}
      {menuValues.menu2 === 'kaiuttimet' && (
        <div>
          <p className='detail'>Täällä on tietoa kaiuttimista</p>
        </div>
      )}
      {menuValues.menu2 === 'kuulokkeet' && (
        <div>
          <p className='detail'>Täällä on tietoa kuulokkeista</p>
        </div>
        )}
      </div>
      <div>
      <FormControl sx={{ m: 3, minWidth: 350 }}>
      <InputLabel id="menu3-label" sx={{ color: 'white' }}>Valitse tuote</InputLabel>
        <Select
          name="menu3"
          value={menuValues.menu3}
          onChange={handleChange}
          sx={{ color: 'white' }}
        >
          <MenuItem value="">
            <em>Tyhjä</em>
          </MenuItem>
          <MenuItem value="valot">Valot</MenuItem>
          <MenuItem value="kaiuttimet">Kaiuttimet</MenuItem>
          <MenuItem value="kuulokkeet">Kuulokkeet</MenuItem>
        </Select>
      </FormControl>
      {menuValues.menu3 === 'valot' && (
        <div>
          <p className='detail'>Täällä on tietoa valoista</p>
        </div>
      )}
      {menuValues.menu3 === 'kaiuttimet' && (
        <div>
          <p className='detail'>Täällä on tietoa kaiuttimista</p>
        </div>
      )}
      {menuValues.menu3 === 'kuulokkeet' && (
        <div>
          <p className='detail'>Täällä on tietoa kuulokkeista</p>
        </div>
        )}
      </div>
      </div>
    </div>
  );
}
