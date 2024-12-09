import React, { useState, useEffect } from 'react';
import { _put, _delete, Event } from './APIconn';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    Typography,
  } from '@mui/material';
  import './css/EventPopUp.css';


interface PopupProps {
    open: boolean;
    onClose: () => void;
    item: Event | null;
    onEdit: (updatedEvent: Event) => void;
    onDelete: (eventId: number) => void;
    onRefresh: () => void;
}

const EventPopUp: React.FC<PopupProps> = ({
    open,
    onClose,
    item,
    onEdit,
    onDelete,
    onRefresh,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedEvent, setEditedEvent] = useState<Event | null>(item);
    const [confirmOpen, setConfirmOpen] = useState(false);

    useEffect(() => {
        setEditedEvent(item);
        if (open) {
          setIsEditing(false);
        }
    }, [item, open]);

    if (!item) return null;

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        if (editedEvent) {
          try {
            await _put(`orders/${editedEvent.id}`, editedEvent);
            onEdit(editedEvent);
            onRefresh();
          } catch (error) {
            console.error('Error updating event:', error);
          }
        }
        setIsEditing(false);
        onClose();
    };
    
    const handleCancelClick = () => {
        setIsEditing(false);
        setEditedEvent(item);
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedEvent((prevEvent) =>
          prevEvent ? { ...prevEvent, [name]: value } : null,
        );
    };
    
    const handleDeleteClick = async () => {
        if (item) {
          try {
            await _delete(`orders/${item.id}`);
            onDelete(item.id);
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
      

    return (
        <Dialog open={open} onClose={onClose}>
          <DialogTitle>Tuotteen tiedot</DialogTitle>
          <DialogContent className="popupContainer">
            {isEditing ? (
              <>
                <TextField
                  label="Tilaaja"
                  name="customer_name"
                  value={editedEvent?.customer_name || ''}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Puhelinnumero"
                  name="customer_phone_number"
                  value={editedEvent?.customer_phone_number || ''}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Sähköposti"
                  name="customer_email"
                  value={editedEvent?.customer_email || ''}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Viesti"
                  name="message"
                  value={editedEvent?.message || ''}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Status"
                  name="order_status"
                  value={editedEvent?.order_status || ''}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Tapahtuma alkaa"
                  name="order_start_date"
                  value={editedEvent?.order_start_date.split('T')[0] || ''}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Eräpäivä"
                  name="payment_due_date"
                  value={editedEvent?.payment_due_date.split('T')[0] || ''}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <div className='stockContainer'>
                <TextField
                  label="Tilauksen kesto"
                  name="order_length_days"
                  type="number"
                  value={editedEvent?.order_length_days || ''}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Hinta"
                  name="payment_resolved"
                  type="total_price"
                  value={editedEvent?.total_price || ''}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Maksutilanne 0/1"
                  name="payment_resolved"
                  type="number"
                  value={editedEvent?.payment_resolved || '0'}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                </div>
              </>
              
            ) : (
              <>
                <Typography>Tilaaja: {item.customer_name}</Typography>
                <Typography>Puhelinnumero: {item.customer_phone_number}</Typography>
                <Typography>Sähköposti: {item.customer_email}</Typography>
                <Typography>Viesti: {item.message}</Typography>
                <Typography>Tilauksen status: {item.order_status}</Typography>
                <Typography>Tilaus alkaa: {item.order_start_date}</Typography>
                <Typography>Tilauksen kesto: {item.order_length_days}</Typography>
                <Typography>Hinta: {item.total_price}</Typography>
                <Typography>Maksutilanne: {item.payment_resolved}</Typography>
                <Typography>Eräpäivä: {item.payment_due_date}</Typography>
                </>
              )}
          </DialogContent>
          <DialogActions>
            {isEditing ? (
              <>
                <Button onClick={handleSaveClick} color="primary">
                  Tallenna
                </Button>
                <Button
                  variant="contained"
                  onClick={handleConfirmOpen}
                  color="error"
                >
                  Poista Tapahtuma
                </Button>
                <Button onClick={handleCancelClick} color="primary">
                  Takaisin
                </Button>
              </>
            ) : (
              <Button onClick={handleEditClick} color="primary">
                Muokkaa / Poista
              </Button>
            )}
            <Button onClick={onClose} color="primary">
              Sulje
            </Button>
            <Dialog open={confirmOpen} onClose={handleConfirmClose}>
              <DialogTitle>Vahvista poisto</DialogTitle>
              <DialogContent>
                <Typography>Haluatko varmasti poistaa tämän tapahtuman?</Typography>
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

export default EventPopUp;
