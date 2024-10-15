import React from 'react';
import { Checkbox, FormControlLabel, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

interface PopupProps {
    open: boolean;
    handleClose: () => void;
  }

export function Popup({ open, handleClose }: PopupProps) {


    const [checked, setChecked] = React.useState(true);

    
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };



return (

<Dialog open={open} onClose={handleClose}>
<DialogTitle>Asetukset Poopup</DialogTitle>
<DialogContent>
  Tänne voi tulla asetuksia
  <FormControlLabel
    label="Asetus 1"
    value="asetus1"
    control={<Checkbox checked={checked} onChange={handleChange} />}
  />
</DialogContent>
<DialogActions>
  <Button onClick={handleClose} color="primary">
    Close
  </Button>
</DialogActions>
</Dialog>

);

}