import '../css/CreateEvent.css';
import { luminary } from '../Theme';
import { useNavigate } from 'react-router-dom';
import { _post } from '../APIconn';
import { useState } from 'react';
import { AlertSystem } from '../Alertsystem';
import dayjs from 'dayjs';
import { Button, IconButton, TextField, Typography } from '@mui/material';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import Grid from '@mui/material/Grid2';



export function CreateEvent() {
    const navigate = useNavigate();
    const [priceValue, setPriceValue] = useState('');
    const [lengthValue, setLengthValue] = useState('');
    // const [paymentValue, setPaymentValue] = useState('');
    const [startValue, setStartValue] = useState('');
    const [dueDateValue, setDueDateValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [phoneValue, setPhoneValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    // const [statusValue, setStatusValue] = useState('');
    const [messageValue, setMessageValue] = useState('');
    const { showAlert, AlertComponent } = AlertSystem();
  
    const handleClick = (path: string) => {
      navigate(path);
    }

    const handleSubmit = async () => {
        const newData = { 
            'total_price': priceValue, 
            'order_created_at': dayjs().toISOString(), 
            'order_start_date': startValue, 
            'order_length_days': lengthValue, 
            'order_end_date': dayjs(startValue).add(parseInt(lengthValue), 'day').toISOString(), 
            'payment_resolved': 0, 
            'payment_due_date': dueDateValue, 
            'customer_name': nameValue, 
            'customer_phone_number': phoneValue, 
            'customer_email': emailValue, 
            'order_status': 'TEST',
            'message': messageValue,
             'contents': [],};
        try {
            console.log("Data to post: ", newData);
            await _post('orders', newData);
            showAlert('Data sent succesfully!', 'success');
        } catch (error) {
            console.log(error);
            showAlert(error.message, 'error');
            // Handle errors
        }
    };

    return (
        <div>
          <div className="returnbutton">
            <IconButton onClick={() => handleClick('/Calendar')}>
              <Typography className="returntext"> Palaa</Typography>
              <KeyboardReturnIcon />
            </IconButton>
          </div>
          <AlertComponent />
          <div className="gridcontainer">
            <Grid
              display="flex"
              justifyContent="center"
              alignItems="center"
              container
              spacing={8}
            >
              <Grid size="auto">
              <h3>Aloituspäivämäärä</h3>
                <TextField
                  id="outlined-basic"
                  label="YYYY-MM-DD"
                  variant="outlined"
                  onChange={(e) => setStartValue(e.target.value)}
                  value={startValue}
                />
                <h3>Tilauksen kesto</h3>
                <TextField
                  id="outlined-basic"
                  label="päivien lkm"
                  variant="outlined"
                  type="number"
                  onChange={(e) => setLengthValue(e.target.value)}
                  value={lengthValue}
                />
              </Grid>
              <Grid size="auto">
              <h3>Nimi</h3>
                <TextField
                  id="outlined-basic"
                  label="Erkki Esimerkki"
                  variant="outlined"
                  onChange={(e) => setNameValue(e.target.value)}
                  value={nameValue}
                />
                <h3>Puhelin</h3>
                <TextField
                  id="outlined-basic"
                  label="0401234567"
                  variant="outlined"
                  onChange={(e) => setPhoneValue(e.target.value)}
                  value={phoneValue}
                />
                <h3>Email</h3>
                <TextField
                  id="outlined-basic"
                  label="esim@erkki.fi"
                  variant="outlined"
                  onChange={(e) => setEmailValue(e.target.value)}
                  value={emailValue}
                />
              </Grid>
              <Grid size="auto">
              <h3>Hinta</h3>
                <TextField
                  id="outlined-basic"
                  label="esim 9001"
                  variant="outlined"
                  type="number"
                  onChange={(e) => setPriceValue(e.target.value)}
                  value={priceValue}
                />
                <h3>Maksupäivä</h3>
                <TextField
                  id="outlined-basic"
                  label="YYYY-MM-DD"
                  variant="outlined"
                  onChange={(e) => setDueDateValue(e.target.value)}
                  value={dueDateValue}
                />
                <h3>Viesti</h3>
                <TextField
                  id="outlined-basic"
                  label="Joku viesti"
                  variant="outlined"
                  onChange={(e) => setMessageValue(e.target.value)}
                  value={messageValue}
                />
              </Grid>
              <Grid
                display="flex"
                justifyContent="center"
                size={12}
                alignItems="center"
              >
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                  Lisää tapahtuma
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
      );

      
}