import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { IconButton, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import '../css/Scan.css';

export function Scan() {
  const navigate = useNavigate();
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (componentRef.current) {
      const printContents = componentRef.current.innerHTML;
      const originalContents = document.body.innerHTML;

      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    }
  };

  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    <div ref={componentRef}>
      <div className="returnbutton">
        <IconButton onClick={() => handleClick('/Inventory')}>
          <Typography className="returntext"> Palaa</Typography>
          <KeyboardReturnIcon />
        </IconButton>
      </div>
      <div>
        <h2>Täällä ei voi skannata QR koodeja. Täällä paistetaan räiskäleitä ja tulostetaan PDF-tiedostoja.</h2>
        <div>
          <Button variant="contained" color="primary" onClick={handlePrint}>
            Print
          </Button>
          <div className="printable">
            <Typography> REEEE </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}