import React from 'react';
import { Checkbox, FormControlLabel, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import "../css/Asetukset.css"

export function Asetukset() {
  const [checked, setChecked] = React.useState(true);
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <div className="settingcontainer">
        <div className="settings">
          <FormControlLabel
            label="Asetus 1"
            value="asetus1"
            control={<Checkbox checked={checked} onChange={handleChange} />}
          />
        </div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Open Popup
      </Button>
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
    </div>
  );
}
