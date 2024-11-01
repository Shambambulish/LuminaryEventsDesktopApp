import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import "../css/AllProducts.css"
import React, { useState, useEffect } from 'react';

interface Product {
  id: string;
  type: string;
  name: string;
  description: string;
}

export function AllProducts() {

  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const [menuValues, setMenuValues] = React.useState({
    menu1: '',
    menu2: '',
    menu3: ''
  });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(window.env.REACT_APP_API_URL + 'devices');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new TypeError("Received non-JSON response");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setMenuValues({
      ...menuValues,
      [name]: value
    });
    const filtered = products.filter(product => product.type === value);
    setFilteredProducts(filtered);
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
      <InputLabel id="menu1-label" sx={{ color: 'white' }}>Valitse tuotetyyppi</InputLabel>
        <Select
          name="menu1"
          value={menuValues.menu1}
          onChange={handleChange}
          sx={{ color: 'white' }}
        >              
          <MenuItem value=""><em>Poista valinta</em></MenuItem>
          <MenuItem value="kokoääni">Kaiuttimet/Kokoääni</MenuItem>
          <MenuItem value="sub">Subwooferit</MenuItem>
          <MenuItem value="dj">DJ-Kalusteet</MenuItem>
          <MenuItem value="lavatekniikka">Lavatekniikka</MenuItem>
        </Select>
      </FormControl>
      {menuValues.menu1 === 'kokoääni' && (
        <div>
          {filteredProducts.map(product => (
                <div key={product.id}>
                  <p className='detail'>{product.name}</p>
                </div>
              ))}
        </div>
      )}
      {menuValues.menu1 === 'sub' && (
        <div>
        {filteredProducts.map(product => (
              <div key={product.id}>
                <p className='detail'>{product.name}</p>
              </div>
            ))}
      </div>
      )}
      {menuValues.menu1 === 'dj' && (
        <div>
        {filteredProducts.map(product => (
              <div key={product.id}>
                <p className='detail'>{product.name}</p>
              </div>
            ))}
      </div>
        )}
      {menuValues.menu1 === 'lavatekniikka' && (
        <div>
        {filteredProducts.map(product => (
              <div key={product.id}>
                <p className='detail'>{product.name}</p>
              </div>
            ))}
      </div>
        )}
      </div>
      <div>
      <FormControl sx={{ m: 3, minWidth: 350 }}>
      <InputLabel id="menu2-label" sx={{ color: 'white' }}>Valitse tuotetyyppi</InputLabel>
        <Select
          name="menu2"
          value={menuValues.menu2}
          onChange={handleChange}
          sx={{ color: 'white' }}
        >              
          <MenuItem value=""><em>Poista valinta</em></MenuItem>
          <MenuItem value="kokoääni">Kaiuttimet/Kokoääni</MenuItem>
          <MenuItem value="sub">Subwooferit</MenuItem>
          <MenuItem value="dj">DJ-Kalusteet</MenuItem>
          <MenuItem value="lavatekniikka">Lavatekniikka</MenuItem>
        </Select>
      </FormControl>
      {menuValues.menu2 === 'kokoääni' && (
        <div>
        {filteredProducts.map(product => (
              <div key={product.id}>
                <p className='detail'>{product.name}</p>
              </div>
            ))}
      </div>
      )}
      {menuValues.menu2 === 'sub' && (
        <div>
        {filteredProducts.map(product => (
              <div key={product.id}>
                <p className='detail'>{product.name}</p>
              </div>
            ))}
      </div>
      )}
      {menuValues.menu2 === 'dj' && (
        <div>
        {filteredProducts.map(product => (
              <div key={product.id}>
                <p className='detail'>{product.name}</p>
              </div>
            ))}
      </div>
        )}
      {menuValues.menu2 === 'lavatekniikka' && (
        <div>
        {filteredProducts.map(product => (
              <div key={product.id}>
                <p className='detail'>{product.name}</p>
              </div>
            ))}
      </div>
        )}
      </div>
      <div>
      <FormControl sx={{ m: 3, minWidth: 350 }}>
      <InputLabel id="menu3-label" sx={{ color: 'white' }}>Valitse tuotetyyppi</InputLabel>
        <Select
          name="menu3"
          value={menuValues.menu3}
          onChange={handleChange}
          sx={{ color: 'white' }}
        >              
          <MenuItem value=""><em>Poista valinta</em></MenuItem>
          <MenuItem value="kokoääni">Kaiuttimet/Kokoääni</MenuItem>
          <MenuItem value="sub">Subwooferit</MenuItem>
          <MenuItem value="dj">DJ-Kalusteet</MenuItem>
          <MenuItem value="lavatekniikka">Lavatekniikka</MenuItem>
        </Select>
      </FormControl>
      {menuValues.menu3 === 'kokoääni' && (
        <div>
        {filteredProducts.map(product => (
              <div key={product.id}>
                <p className='detail'>{product.name}</p>
              </div>
            ))}
      </div>
      )}
      {menuValues.menu3 === 'sub' && (
        <div>
        {filteredProducts.map(product => (
              <div key={product.id}>
                <p className='detail'>{product.name}</p>
              </div>
            ))}
      </div>
      )}
      {menuValues.menu3 === 'dj' && (
        <div>
        {filteredProducts.map(product => (
              <div key={product.id}>
                <p className='detail'>{product.name}</p>
              </div>
            ))}
      </div>
        )}
      {menuValues.menu3 === 'lavatekniikka' && (
        <div>
        {filteredProducts.map(product => (
              <div key={product.id}>
                <p className='detail'>{product.name}</p>
              </div>
            ))}
      </div>
        )}
      </div>
      </div>
    </div>
  );
}
