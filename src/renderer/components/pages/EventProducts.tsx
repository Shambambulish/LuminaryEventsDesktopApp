import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function EventProducts() {
  const navigate = useNavigate();
  

  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    <div>
    <div className='returnbutton'>
    <IconButton onClick={() => handleClick('/Inventory')}>
      <Typography className='returntext'> Palaa</Typography><KeyboardReturnIcon></KeyboardReturnIcon>
    </IconButton>
    </div>
    <div>
      <h2>Täällä on tapahtumien tuotteet</h2>
    </div>
    </div>
  );
}
