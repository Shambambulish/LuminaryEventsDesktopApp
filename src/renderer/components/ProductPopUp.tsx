import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

interface PopupProps {
  open: boolean;
  onClose: () => void;
  product: Product | null;
}

interface Product {
  id: string;
  type: string;
  name: string;
  description: string;
  current_stock: number;
  total_stock: number;
}

const ProductPopup: React.FC<PopupProps> = ({ open, onClose, product }) => {
  if (!product) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Product Details</DialogTitle>
      <DialogContent>
        <Typography>Tuotteen nimi: {product.name}</Typography>
        <Typography>Kuvaus: {product.description}</Typography>
        <Typography>Määrä varastossa: {product.current_stock}</Typography>
        <Typography>Kokonaismäärä: {product.total_stock}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductPopup;