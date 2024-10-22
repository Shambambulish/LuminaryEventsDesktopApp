import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import * as React from 'react';
import "../css/AllProducts.css"

export function AllProducts() {
  const navigate = useNavigate();
  const [menuValues, setMenuValues] = React.useState({
    menu1: '',
    menu2: '',
    menu3: ''
  });

  const handleClick = (path: string) => {
    navigate(path);
  };

  const handleChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setMenuValues({
      ...menuValues,
      [name]: value
    });
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
      </div>
      <div>
      <FormControl sx={{ m: 3, minWidth: 350 }}>
      <InputLabel id="menu1-label" sx={{ color: 'white' }}>Valitse tuote</InputLabel>
        <Select
          name="menu2"
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
      </div>
      <div>
      <FormControl sx={{ m: 3, minWidth: 350 }}>
      <InputLabel id="menu1-label" sx={{ color: 'white' }}>Valitse tuote</InputLabel>
        <Select
          name="menu3"
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
      </div>
      </div>
    </div>
  );
}
