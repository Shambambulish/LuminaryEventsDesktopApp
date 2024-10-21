import { Box, colors, ThemeProvider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { luminary } from '../Theme';
import '../css/Inventory.css';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';

export function Inventory() {
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    <div>
      <div className="cardholder">
        <div className="card">
          <ThemeProvider theme={luminary}>
            <Box
              className="box"
              sx={{
                backgroundColor: luminary.palette.primary.main,
                cursor: 'pointer',
              }}
              onClick={() => handleClick('/AllProducts')}
            >
              <div>
                <Typography
                  className="cardtitle"
                  color={luminary.palette.secondaryContrastText}
                  sx={{ pointerEvents: 'none' }}
                >
                  {' '}
                  Kaikki tuotteet{' '}
                </Typography>
                <Typography
                  className="storagedata"
                  color={luminary.palette.secondaryContrastText}
                  sx={{ pointerEvents: 'none', fontSize: 45 }}
                >
                  {' '}
                  XKPL
                </Typography>
              </div>
            </Box>
          </ThemeProvider>
        </div>
        <div className="card">
          <ThemeProvider theme={luminary}>
            <Box
              className="box"
              sx={{
                backgroundColor: luminary.palette.primary.main,
                cursor: 'pointer',
              }}
              onClick={() => handleClick('/InventoryProducts')}
            >
              <div>
                <Typography
                  className="cardtitle"
                  color={luminary.palette.secondaryContrastText}
                  sx={{ pointerEvents: 'none' }}
                >
                  {' '}
                  Tuotteet varastossa{' '}
                </Typography>
                <Typography
                  className="storagedata"
                  color={luminary.palette.secondaryContrastText}
                  sx={{ pointerEvents: 'none', fontSize: 45 }}
                >
                  {' '}
                  X/32
                </Typography>
              </div>
            </Box>
          </ThemeProvider>
        </div>
        <div className="card">
          <ThemeProvider theme={luminary}>
            <Box
              className="box"
              sx={{
                backgroundColor: luminary.palette.primary.main,
                cursor: 'pointer',
              }}
              onClick={() => handleClick('/EventProducts')}
            >
              <div>
                <Typography
                  className="cardtitle"
                  color={luminary.palette.secondaryContrastText}
                  sx={{ pointerEvents: 'none' }}
                >
                  {' '}
                  Tuotteet tapahtumissa{' '}
                </Typography>
                <Typography
                  className="storagedata"
                  color={luminary.palette.secondaryContrastText}
                  sx={{ pointerEvents: 'none', fontSize: 45 }}
                >
                  {' '}
                  X/32
                </Typography>
              </div>
            </Box>
          </ThemeProvider>
        </div>
      </div>
      <div className="cardholder">
        <div className="card">
          <ThemeProvider theme={luminary}>
            <Box
              className="box"
              sx={{
                backgroundColor: luminary.palette.primary.main,
                cursor: 'pointer',
              }}
              onClick={() => handleClick('/History')}
            >
              <div>
                <Typography
                  className="cardtitle"
                  color={luminary.palette.secondaryContrastText}
                  sx={{ pointerEvents: 'none' }}
                >
                  {' '}
                  Historia{' '}
                </Typography>
                <Typography
                  className="historydata"
                  color={luminary.palette.primary.contrastText}
                  sx={{ pointerEvents: 'none', fontSize: 15 }}
                >
                  {' '}
                  Muutoksia: X poistettu ja Y lisätty
                </Typography>
              </div>
            </Box>
          </ThemeProvider>
        </div>
        <div className="card">
          <ThemeProvider theme={luminary}>
            <Box
              className="box"
              sx={{
                backgroundColor: luminary.palette.primary.main,
                cursor: 'pointer',
              }}
              onClick={() => handleClick('/Scan')}
            >
              <div>
                <Typography
                  className="cardtitle"
                  color={luminary.palette.secondaryContrastText}
                  sx={{ pointerEvents: 'none' }}
                >
                  {' '}
                  Skannaa QR-koodi{' '}
                </Typography>
                <QrCodeScannerIcon sx={{ color: 'white', fontSize: 125 }} />
              </div>
            </Box>
          </ThemeProvider>
        </div>
        <div className="card">
          <ThemeProvider theme={luminary}>
            <Box
              className="box"
              sx={{
                backgroundColor: luminary.palette.primary.main,
                cursor: 'pointer',
              }}
              onClick={() => handleClick('/CreateProduct')}
            >
              <div>
                <Typography
                  className="cardtitle"
                  color={luminary.palette.secondaryContrastText}
                  sx={{ pointerEvents: 'none' }}
                >
                  Luo tuote
                </Typography>
                <AddBusinessIcon sx={{ color: 'white', fontSize: 125 }} />
              </div>
            </Box>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
}
