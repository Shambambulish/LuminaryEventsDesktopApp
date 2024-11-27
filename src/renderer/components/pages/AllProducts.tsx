import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import '../css/AllProducts.css';
import React, { useState, useEffect } from 'react';
import { _get } from '../APIconn';
import ProductPopup from '../ProductPopUp';
import { AlertSystem } from '../Alertsystem';

interface Product {
  id: string;
  type: string;
  name: string;
  description: string;
  current_stock: number;
  total_stock: number;
  sub_ids: string;
}

export function AllProducts() {
  const navigate = useNavigate();
  const { showAlert, AlertComponent } = AlertSystem();
  const [products, setProducts] = useState<Product[]>([]);
  const [uniqueTypes, setUniqueTypes] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<{ [key: string]: Product[] }>({
    menu1: [],
    menu2: [],
    menu3: []
  });

  const [menuValues, setMenuValues] = React.useState({
    menu1: '',
    menu2: '',
    menu3: '',
  });


    const fetchData = async () => {
      try {
        const response = await _get(`devices`);
        const data = response.data;
        console.log("Fetched data: ", data);
        setProducts(data);
        const types = [...new Set(data.map((product: Product) => product.type))] as string[];
        setUniqueTypes(types);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    useEffect(() => {
      fetchData();
    }, []);
  
    const handleClick = (path: string) => {
      navigate(path);
    };

  const handleChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setMenuValues({
      ...menuValues,
      [name]: value
    });

    const filtered = products.filter(product => product.type === value);
    setFilteredProducts({
      ...filteredProducts,
      [name]: filtered
    });
  };
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    setSelectedProduct(null);
  };

  const handleEdit = (updatedProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setFilteredProducts((prevFilteredProducts) =>
      Object.keys(prevFilteredProducts).reduce((acc, key) => {
        acc[key] = prevFilteredProducts[key].map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        );
        return acc;
      }, {} as { [key: string]: Product[] })
    );
    fetchData();
  };

  const handleDelete = (productId: string) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
    setFilteredProducts((prevFilteredProducts) =>
      Object.keys(prevFilteredProducts).reduce((acc, key) => {
        acc[key] = prevFilteredProducts[key].filter((product) => product.id !== productId);
        return acc;
      }, {} as { [key: string]: Product[] })
    );

    setMenuValues((prevMenuValues) => {
      const newMenuValues = { ...prevMenuValues };
      (Object.keys(newMenuValues) as Array<keyof typeof newMenuValues>).forEach((key) => {
        if (!filteredProducts[key].length) {
          newMenuValues[key] = '';
        }
      });
      showAlert('Data deleted successfully!', 'success');
      return newMenuValues;
    });
    fetchData();
  };

  return (
    <div>
      <div className="returnbutton">
        <IconButton onClick={() => handleClick('/Inventory')}>
          <Typography className="returntext"> Palaa</Typography>
          <KeyboardReturnIcon></KeyboardReturnIcon>
        </IconButton>
      </div>
      <div className="storage">
        <div>
          <Typography className="storageheader">Kaikki tuotteet</Typography>
        </div>
        <div>
          <FormControl sx={{ m: 3, minWidth: 350 }}>
          <InputLabel id="menu1-label" sx={{ color: 'white'}}>Valitse tuotetyyppi</InputLabel>
            <Select
              name="menu1"
              value={menuValues.menu1}
              onChange={handleChange}
              sx={{ color: 'white', textTransform: 'uppercase' }}
            >
              <MenuItem value="">
                <em>Poista valinta</em>
              </MenuItem>
              {uniqueTypes.map((type) => (
                <MenuItem key={type} value={type} sx={{ textTransform: 'uppercase' }}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {menuValues.menu1 && (
            <div>
              {filteredProducts.menu1.map(product => (
                <div key={product.id} onClick={() => handleProductClick(product)} className="product-item">
                  <h3 className="detail">{product.name}</h3>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <FormControl sx={{ m: 3, minWidth: 350 }}>
          <InputLabel id="menu2-label" sx={{ color: 'white'}}>Valitse tuotetyyppi</InputLabel>
            <Select
              name="menu2"
              value={menuValues.menu2}
              onChange={handleChange}
              sx={{ color: 'white', textTransform: 'uppercase' }}
            >
              <MenuItem value="">
                <em>Poista valinta</em>
              </MenuItem>
              {uniqueTypes.map((type) => (
                <MenuItem key={type} value={type} sx={{ textTransform: 'uppercase' }}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {menuValues.menu2 && (
            <div>
              {filteredProducts.menu2.map(product => (
                <div key={product.id} onClick={() => handleProductClick(product)} className="product-item">
                  <h3 className="detail">{product.name}</h3>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <FormControl sx={{ m: 3, minWidth: 350 }}>
          <InputLabel id="menu3-label" sx={{ color: 'white'}}>Valitse tuotetyyppi</InputLabel>
            <Select
              name="menu3"
              value={menuValues.menu3}
              onChange={handleChange}
              sx={{ color: 'white', textTransform: 'uppercase' }}
            >
              <MenuItem value="">
                <em>Poista valinta</em>
              </MenuItem>
              {uniqueTypes.map((type) => (
                <MenuItem key={type} value={type} sx={{ textTransform: 'uppercase' }}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {menuValues.menu3 && (
            <div>
              {filteredProducts.menu3.map(product => (
                <div key={product.id} onClick={() => handleProductClick(product)} className="product-item">
                  <h3 className="detail">{product.name}</h3>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <ProductPopup open={popupOpen} onClose={handleClosePopup} product={selectedProduct} onEdit={handleEdit} onDelete={handleDelete} onRefresh={fetchData} />
      <AlertComponent />
    </div>
  );
}

