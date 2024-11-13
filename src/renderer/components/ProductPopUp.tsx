import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Typography } from '@mui/material';
import '../components/css/ProductPopup.css';

interface PopupProps {
  open: boolean;
  onClose: () => void;
  product: Product | null;
  onEdit: (updatedProduct: Product) => void;
}

interface Product {
  id: string;
  type: string;
  name: string;
  description: string;
  current_stock: number;
  total_stock: number;
}

const ProductPopup: React.FC<PopupProps> = ({ open, onClose, product, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState<Product | null>(product);

  useEffect(() => {
    setEditedProduct(product);
  }, [product]);

  if (!product) return null;

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    if (editedProduct) {
      onEdit(editedProduct);
    }
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedProduct(product);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => prevProduct ? { ...prevProduct, [name]: value } : null);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Tuotteen tiedot</DialogTitle>
      <DialogContent className='popupContainer'>
        {isEditing ? (
          <>
            <TextField
              label="Tuotteen nimi"
              name="name"
              value={editedProduct?.name || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Tuotteen kuvaus"
              name="description"
              value={editedProduct?.description || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Määrä varastossa"
              name="current_stock"
              type="number"
              value={editedProduct?.current_stock || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Kokonaismäärä"
              name="total_stock"
              type="number"
              value={editedProduct?.total_stock || ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </>
        ) : (
          <>
            <Typography>Tuotteen nimi: {product.name}</Typography>
            <Typography>Tuotteen kuvaus: {product.description}</Typography>
            <Typography>Määrä varastossa: {product.current_stock}</Typography>
            <Typography>Kokonaismäärä: {product.total_stock}</Typography>
          </>
        )}
      </DialogContent>
      <DialogActions>
        {isEditing ? (
          <>
          <Button onClick={handleSaveClick} color="primary">
            Tallenna
          </Button>
          <Button onClick={handleCancelClick} color="primary">
            Takaisin
          </Button>
        </>
        ) : (
          <Button onClick={handleEditClick} color="primary">
            Muokkaa
          </Button>
        )}
        <Button onClick={onClose} color="primary">
          Sulje
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductPopup;