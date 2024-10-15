import { Box, ThemeProvider, Typography, } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { luminary } from '../Theme';
import "../css/Inventory.css"

export function Inventory() {

  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
  };


  return (
    <div>
    <div className='cardholder'>
    <div className='card'>
        <ThemeProvider theme={luminary}>
        <Box className='box'
          sx={{
            backgroundColor: luminary.palette.primary.main,
          }}
          onClick={() => handleClick('/AllProducts')}
        >
         <Typography color={luminary.palette.secondaryContrastText} sx={{ pointerEvents: 'none' }}> Kaikki tuotteet </Typography>
        </Box>
        </ThemeProvider>
    </div>
    <div className='card'>
        <ThemeProvider theme={luminary}>
        <Box className='box'
          sx={{
            backgroundColor: luminary.palette.primary.main,
          }}
          onClick={() => handleClick('/InventoryProducts')}
        >
         <Typography color={luminary.palette.secondaryContrastText} sx={{ pointerEvents: 'none' }}> Tuotteet varastossa </Typography>
        </Box>
        </ThemeProvider>
    </div>
    <div className='card'>
        <ThemeProvider theme={luminary}>
        <Box className='box'
          sx={{
            backgroundColor: luminary.palette.primary.main,
          }}
          onClick={() => handleClick('/EventProducts')}
        >
         <Typography color={luminary.palette.secondaryContrastText} sx={{ pointerEvents: 'none' }}> Tuotteet tapahtumissa </Typography>
        </Box>
        </ThemeProvider>
    </div>
    </div>
      <div className='cardholder'>
      <div className='card'>
        <ThemeProvider theme={luminary}>
        <Box className='box'
          sx={{
            backgroundColor: luminary.palette.primary.main,
          }}
          onClick={() => handleClick('/History')}
        >
         <Typography color={luminary.palette.secondaryContrastText} sx={{ pointerEvents: 'none' }}> Historia </Typography>
        </Box>
        </ThemeProvider>
    </div>
    <div className='card'>
        <ThemeProvider theme={luminary}>
        <Box className='box'
          sx={{
            backgroundColor: luminary.palette.primary.main,
          }}
          onClick={() => handleClick('/Scan')}
        >
         <Typography color={luminary.palette.secondaryContrastText} sx={{ pointerEvents: 'none' }}> Skannaa QR-koodi </Typography>
        </Box>
        </ThemeProvider>
    </div>
    <div className='card'>
        <ThemeProvider theme={luminary}>
        <Box className='box'
          sx={{
            backgroundColor: luminary.palette.primary.main,
          }}
          onClick={() => handleClick('/CreateProduct')}
        >
         <Typography color={luminary.palette.secondaryContrastText} sx={{ pointerEvents: 'none' }}> Luo tuote </Typography>
        </Box>
        </ThemeProvider>
    </div>




      </div>
    </div>
  );
}