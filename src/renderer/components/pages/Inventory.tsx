import React from 'react';
import { Button, Box, ThemeProvider, Typography, } from '@mui/material';
import { luminary } from '../Theme';
import "../css/Inventory.css"

export function Inventory() {

  const handleClick = (boxNumber: number) => {
    console.log(`Box ${boxNumber} clicked!`);
  };



  return (
    <div>
    <div className='cardholder'>
    <div className='card'>
        <ThemeProvider theme={luminary}>
        <Box className='box'
          sx={{
            backgroundColor: luminary.palette.primary.main,
          }} onClick={() => handleClick(1)}
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
          }} onClick={() => handleClick(2)}
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
          }} onClick={() => handleClick(3)}
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
          }} onClick={() => handleClick(4)}
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
          }} onClick={() => handleClick(5)}
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
          }} onClick={() => handleClick(6)}
        >
         <Typography color={luminary.palette.secondaryContrastText} sx={{ pointerEvents: 'none' }}> Luo tuote </Typography>
        </Box>
        </ThemeProvider>
    </div>




      </div>
    </div>
  );
}
