import React, { useState, useEffect } from 'react';
import {
  Dialog,
  Checkbox,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Typography,
  FormControlLabel,
} from '@mui/material';
import './css/ProductPopup.css';
import { QRCodeSVG } from 'qrcode.react';
import { _put } from './APIconn';
import { _delete } from './APIconn';

interface PopupProps {
  open: boolean;
  onClose: () => void;
  product: Product | null;
  onEdit: (updatedProduct: Product) => void;
  onDelete: (productId: string) => void;
  onRefresh: () => void;
  onPrint: () => void;
}

interface Product {
  id: string;
  type: string;
  name: string;
  description: string;
  current_stock: number;
  total_stock: number;
  sub_ids: string;
}

const ProductPopup: React.FC<PopupProps> = ({
  open,
  onClose,
  product,
  onEdit,
  onDelete, 
  onRefresh,
  onPrint,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState<Product | null>(product);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const componentRef = React.useRef<HTMLDivElement>(null);
  const qrRef = React.useRef<SVGSVGElement>(null);

  useEffect(() => {
    setEditedProduct(product);
    if (open) {
      setIsEditing(false);
    }
  }, [product, open]);

  if (!product) {
    return null;
  }

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    if (editedProduct) {
      if (editedProduct.current_stock === editedProduct.total_stock) {
        editedProduct.sub_ids = 'empty';
      }
      else {
        const subIdsArray = Array.from({ length: editedProduct.total_stock }, (_, index) => {
          return index < editedProduct.current_stock ? `${editedProduct.id}_${index + 1}` : null;
        }).filter(Boolean);
        editedProduct.sub_ids = subIdsArray.join(' ');
      }
      try {
        await _put(`devices/${editedProduct.id}`, editedProduct);
        onEdit(editedProduct);
        onRefresh();
      } catch (error) {
        console.error('Error updating product:', error);
      }
    }
    setIsEditing(false);
    onClose();
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedProduct(product);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) =>
      prevProduct ? { ...prevProduct, [name]: value } : null,
    );
  };

  const handleDeleteClick = async () => {
    if (product) {
      try {
        await _delete(`devices/${product.id}`);
        onDelete(product.id);
        onClose();
      } catch (error) {
        console.error(error);
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

  const handleCheckboxChange = (index: number) => {
    setEditedProduct((prevProduct) => {
      if (!prevProduct) return null;
      const newCurrentStock = prevProduct.current_stock === index + 1 ? index : index + 1;
      return { ...prevProduct, current_stock: newCurrentStock };
    });
    setCurrentIndex(index);
  };

  const subIdsArray = editedProduct?.sub_ids ? editedProduct.sub_ids.split(' ') : [];

  const checkboxes = Array.from({ length: editedProduct?.total_stock || 0 }, (_, index) => (
    <FormControlLabel
      key={index}
      control={
        <Checkbox
          checked={index < (editedProduct?.current_stock || 0)}
          onChange={() => handleCheckboxChange(index)}
          disabled={!isEditing}
        />
      }
      label={` ${product.id}_${index + 1}`}
    />
  ));

  const handlePrint = () => {
    if (componentRef.current && qrRef.current) {
      const printContents = componentRef.current.innerHTML;

      // Get the SVG as a string
      const qrSVG = new XMLSerializer().serializeToString(qrRef.current);

      // Create an iframe for printing
      const iframe = document.createElement('iframe');
      iframe.style.position = 'absolute';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = 'none';
      document.body.appendChild(iframe);

      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write('<html><head><title>Print</title></head><body>');
        iframeDoc.write('<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2px;">');
        iframeDoc.write(printContents);

        // Create a div for barcode SVG
        const div = iframeDoc.createElement('div');
        div.innerHTML = qrSVG;
        /* iframeDoc.body.appendChild(div); */

        iframeDoc.write('</div>');
        iframeDoc.write('</body></html>');
        iframeDoc.close();
        iframe.contentWindow?.print();
        document.body.removeChild(iframe);
      }
    }
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
              label="Tuotteen tyyppi"
              name="type"
              value={editedProduct?.type || ''}
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
            <div className='stockContainer'>
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
            </div>
            <div className='checkboxContainer'>
              {checkboxes}
              </div>
          </>
          
        ) : (
          <>
            <Typography>Tuotteen nimi: {product.name}</Typography>
            <Typography>Tuotteen tyyppi: {product.type}</Typography>
            <Typography>Tuotteen kuvaus: {product.description}</Typography>
            <Typography>Määrä varastossa: {product.current_stock}</Typography>
            <Typography>Kokonaismäärä: {product.total_stock}</Typography>
              <div className='checkboxContainer'>
              {checkboxes}
              </div>
            </>
          )}
      </DialogContent>
      <DialogActions>
        {isEditing ? (
          <>
            <Button onClick={handleSaveClick} color="primary">
              Tallenna
            </Button>
            <Button onClick={() => handlePrint()} color="primary">
              Tulosta
            </Button>
            <Button
              variant="contained"
              onClick={handleConfirmOpen}
              color="error"
            >
              Poista Tuote
            </Button>
            <Button onClick={handleCancelClick} color="primary">
              Takaisin
            </Button>
          </>
        ) : (
          <Button onClick={handleEditClick} color="primary">
            Muokkaa / Poista / Tulosta
          </Button>
        )}
        <div ref={componentRef} style={{ display: 'none' }}>
            <QRCodeSVG size={256} value={`${product.id}_${currentIndex !== null ? currentIndex + 1 : ''} ${product.name}`} ref={qrRef} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
              <Typography style={{ textAlign: 'center', fontSize: '2em', fontFamily: 'Impact, Charcoal, sans-serif', border: '1px solid black', padding: '5px', borderRadius: '5px' }}>
              {product.name}
              <br />
              ID: {`${product.id}_${currentIndex !== null ? currentIndex + 1 : ''}`}
              </Typography>
            </div>
        </div>
        <Button onClick={onClose} color="primary">
          Sulje
        </Button>
        <Dialog open={confirmOpen} onClose={handleConfirmClose}>
          <DialogTitle>Vahvista poisto</DialogTitle>
          <DialogContent>
            <Typography>Haluatko varmasti poistaa tämän tuotteen?</Typography>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={handleConfirmDelete}
              color="error"
            >
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