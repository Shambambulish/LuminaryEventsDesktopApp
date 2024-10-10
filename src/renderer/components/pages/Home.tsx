import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';

export function Home() {
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState('success');
  const [message, setMessage] = React.useState('allan please add message');

  const handleClick = () => {
    setOpen(true);
    setSeverity(event.target.getAttribute('severity'));
    setMessage(event.target.getAttribute('message'));
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <h2>Tää o kotisivu</h2>
      <Button
        onClick={handleClick}
        variant="outlined"
        severity="success"
        message="success"
      >
        Testinappi 1
      </Button>
      <br />
      <br />
      <Button
        onClick={handleClick}
        variant="outlined"
        severity="info"
        message="info"
      >
        Testinappi 2
      </Button>
      <br />
      <br />
      <Button
        onClick={handleClick}
        variant="outlined"
        severity="error"
        message="error"
      >
        Testinappi 3
      </Button>
      <br />
      <br />
      <Button
        onClick={handleClick}
        variant="outlined"
        severity="warning"
        message="warning"
      >
        Testinappi 4
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
