import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import './css/ProductPopup.css';
import { _put } from './APIconn';
import { _delete } from './APIconn';
import { AlertSystem } from './Alertsystem';

interface PopupProps {
  open: boolean;
  onClose: () => void;
  product: Product | null;
  onEdit: (updatedProduct: Product) => void;
  onDelete: (productId: string) => void;
}

interface Product {
  id: string;
  type: string;
  name: string;
  description: string;
  current_stock: number;
  total_stock: number;
}

const ProductPopup: React.FC<PopupProps> = ({ open, onClose, product, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState<Product | null>(product);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { showAlert } = AlertSystem();

  useEffect(() => {
    setEditedProduct(product);
    if (open) {
      setIsEditing(false);
    }
  }, [product, open]);

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

  const handleDeleteClick = async () => {
    if (product) {
      try {
        await _delete(`devices/${product.id}`);
        onDelete(product.id);
        showAlert('Data deleted succesfully!', 'success');
        onClose();
      } catch (error) {
        console.error(error);
        showAlert(error.message, 'error');
      }
    }
  };
  const handleConfirmOpen = () => {
    setConfirmOpen(true);
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
  };

  const handleConfirmDelete = () => {
    handleDeleteClick();
    setConfirmOpen(false);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Tuotteen tiedot</DialogTitle>
      <DialogContent className="popupContainer">
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
            <Button onClick={handleConfirmOpen} color="primary">
               Poista
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
        <Dialog open={confirmOpen} onClose={handleConfirmClose}>
        <DialogTitle>Vahvista poisto</DialogTitle>
        <DialogContent>
          <Typography>Haluatko varmasti poistaa tämän tuotteen?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDelete} color="primary" className="majorbutton">
            Poista
          </Button>
          <Button onClick={handleConfirmClose} color="primary">
            Peruuta
          </Button>
        </DialogActions>
      </Dialog>
      </DialogActions>
    </Dialog>
    
  );
};

export default ProductPopup;
