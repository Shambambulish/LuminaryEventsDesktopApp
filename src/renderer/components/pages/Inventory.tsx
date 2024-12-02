import { Box, colors, ThemeProvider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { luminary } from '../Theme';
import '../css/Inventory.css';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { useEffect, useState } from 'react';
import { _get } from '../APIconn';

export function Inventory() {
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
  };

  const [history, setHistory] = useState<History[]>([]);
  const [device, setDevice] = useState<Device[]>([]);
  const [totalCurrentStock, setTotalCurrentStock] = useState<number>(0);
  const [totalStock, setTotalStock] = useState<number>(0);

  interface Device {
    name: string;
    current_stock: number;
    total_stock: number;
    id: number;
    type: string;
  }

  interface History {
    deviceID: number;
    listed_change: string;
    time_changed: string;
    id: number;
  }
  
  useEffect(() => {
    _get('devices')
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          setDevice(response.data);
          const totalCurrent = response.data.reduce((sum, device) => sum + device.current_stock, 0);
          const total = response.data.reduce((sum, device) => sum + device.total_stock, 0);
          setTotalCurrentStock(totalCurrent);
          setTotalStock(total);
        } else {
          console.error('Unexpected response structure:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    _get('history')
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          setHistory(response.data);
        } else {
          console.error('Unexpected response structure:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const formatListedChange = (listed_change: string) => {
    if (listed_change.startsWith('Created device:')) {
      return 'Luotiin LaiteID ';
    } else if (listed_change.startsWith('Deleted device name:')) {
      return 'Poistettiin LaiteID';
    }
    return 'Muokattiin LaiteID';

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
                  sx={{ pointerEvents: 'none'}}
                >
                  {device.length} KPL
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
                  Tuotteet varastossa
                </Typography>
                <Typography
                  className="storagedata"
                  color={luminary.palette.secondaryContrastText}
                  sx={{ pointerEvents: 'none' }}
                >
                  {totalCurrentStock} / {totalStock}
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
                  sx={{ pointerEvents: 'none' }}
                >
                  {totalStock-totalCurrentStock} / {totalStock}
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
                sx={{ pointerEvents: 'none', whiteSpace: 'pre-line' }}
              >
                {history.slice(-3).map((item) => `${formatListedChange(item.listed_change)} ${item.deviceID}, MuutosID ${item.id}`).join('\n')}
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
