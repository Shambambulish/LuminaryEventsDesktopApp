import { useEffect, useState } from 'react';
import {
  Button,
  ThemeProvider,
  Typography,
  ButtonGroup,
} from '@mui/material';
import '../css/Settings.css';
import { luminary } from '../Theme';
import { _get } from '../APIconn';
import exportFromJSON, {ExportType} from 'export-from-json';

export function Settings() {
  const [exportType, setExportType] = useState<ExportType>();

  const handleDeviceExport = async () => {
    try {
      const devicedata = await fetchDevices();
      exportFromJSON({ data: devicedata, fileName: 'devices', exportType });
    } catch (error) {
      console.error('Error exporting devices:', error);
    }
  };
  const handleOrderExport = async () => {
    try {
      const orderdata = await fetchOrders();
      exportFromJSON({ data: orderdata, fileName: 'orders', exportType });
    } catch (error) {
      console.error('Error exporting orders:', error);
    }
  };
  const handleCustomExport = async () => {
    try {
      const customdata = await fetchCustom();
      exportFromJSON({ data: customdata, fileName: 'custom', exportType });
    } catch (error) {
      console.error('Error exporting:', error);
    }
  };
  
  const fetchDevices = async () => {
    try {
      const response = await _get(`devices`);
      const devicedata = response.data;
      return devicedata;

    } catch (error) {
      console.error('Error fetching device data:', error);
    }
  };
  const fetchOrders = async () => {
    try {
      const response = await _get(`orders`);
      const orderdata = response.data;
      return orderdata;
    } catch (error) {
      console.error('Error fetching order data:', error);
    }
  };
  /*const fetchCustom = async () => {
    try {
      const response = await _get({url: `custom`});
      const customdata = response.data;
      console.log("Fetched data: ", data);
      return customdata;

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };*/

  useEffect(() => {
    fetchDevices();
    fetchOrders();
   // fetchCustom();
  }, []);

  return (
    <div className="settingcontainer"> 
      <ThemeProvider theme={luminary}>
      <div className='exporttypes'>
        <ButtonGroup variant="contained" aria-label="Basic button group">
          <Button className={`nabbi ${exportType === 'json' ? 'focus' : ''}`} onClick={() => setExportType('json')}>JSON</Button>
          <Button className={`nabbi ${exportType === 'xls' ? 'focus' : ''}`} onClick={() => setExportType('xls')}>XLS</Button>
          <Button className={`nabbi ${exportType === 'csv' ? 'focus' : ''}`} onClick={() => setExportType('csv')}>CSV</Button>
        </ButtonGroup>
      </div>
        <Button
          variant="contained"
          onClick={handleDeviceExport}
          style={{
            backgroundColor: luminary.palette.primary.main,
          }}
        >
          Backup Devices
        </Button>
        <Button
          variant="contained"
          onClick={handleOrderExport}
          sx={{
            backgroundColor: luminary.palette.primary.main,
          }}
        >
            {' '}
            Backup Orders{' '}
        </Button>
        <Button
          variant="contained"
          onClick={handleCustomExport}
          sx={{
            backgroundColor: luminary.palette.primary.main,
          }}
        >
            {' '}
            Backup Other{' '}
        </Button>
      </ThemeProvider>
    </div>
  );
}