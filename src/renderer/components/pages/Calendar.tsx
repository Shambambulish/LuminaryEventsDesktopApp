import '../css/Calendar.css';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/fi';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { luminary } from '../Theme';
import { Badge, Box } from '@mui/material';
import { _get, _post, _put, _delete, EventInterface } from '../APIconn';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';





export function Calendar() {
  const [value, setValue] = useState<Dayjs | null>(dayjs());
  const [data, setData] = useState<EventInterface[]>([]);
  // const [open, setOpen] = useState(false);
  dayjs.locale('fi')

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const onDateSelect = (event: any) => {
    setValue(event);
    let onlyDate = dayjs(event.$d).toISOString();
    console.log('onlyDate: ', onlyDate)
  };

  useEffect(() => {
    // Fetch data when component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await _get('orders', { headers: { Authorization: 'Bearer your_token_here' } });
      setData(response.data);
      console.log("Fetched data: ", response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle errors
    }
  };


  const addData = async () => {
    try {
      const newData = { 
        'total_price': 1, 
        'order_created_at': dayjs().toISOString(), 
        'order_start_date': dayjs().toISOString(), 
        'order_length_days': 1, 
        'order_end_date': dayjs().add(1, 'day').toISOString(), 
        'payment_resolved': 0, 
        'payment_due_date': dayjs().add(2, 'day').toISOString(), 
        'customer_name': 'marraskuutesti', 
        'customer_phone_number': '123', 
        'customer_email': 'testi@posti', 
        'order_status': 'test', 'message': 
        'testaan postia', 'contents': [],};
      console.log("Data to post: ", newData);
      await _post('orders', newData);
      fetchData(); // Refresh data after adding
    } catch (error) {
      console.error('Error adding data:', error);
      // Handle errors
    }
  };

  const updateData = async (id: any, updatedData: {} | undefined) => {
    try {
      await _put(`orders/${id}`, updatedData);
      fetchData(); // Refresh data after updating
    } catch (error) {
      console.error('Error updating data:', error);
      // Handle errors
    }
  };

  const deleteData = async (id: any) => {
    try {
      await _delete(`orders/${id}`);
      console.log("Data Deleted");
      fetchData(); // Refresh data after deleting
    } catch (error) {
      console.error('Error deleting data:', error);
      // Handle errors
    }
  };

  const handleClik = () => {
    axios.post(`${window.env.REACT_APP_API_URL}orders`, {
      'total_price': 1, 
      'order_created_at': dayjs().toISOString(), 
      'order_start_date': dayjs().toISOString(), 
      'order_length_days': 1, 
      'order_end_date': dayjs().add(1, 'day').toISOString(), 
      'payment_resolved': 0, 
      'payment_due_date': dayjs().add(2, 'day').toISOString(), 
      'customer_name': 'marraskuutesti', 
      'customer_phone_number': '123', 
      'customer_email': 'testi@posti', 
      'order_status': 'test', 
      'message': 'testaan postia', 
      'contents': [],
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  return (
    <div className="calendarcontainer">
      <div>
        <Box
          className="conttainer"
          sx={{
            backgroundColor: luminary.palette.primary.main,
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fi">
            <DemoContainer
              components={['DateCalendar', 'DateCalendar', 'DateCalendar']}
            >
              <DemoItem label={'Tässä o kalenteri :D'}>
                <DateCalendar
                  value={value} 
                  onChange={onDateSelect}
                  renderLoading={() => <DayCalendarSkeleton />}
                  views={['year', 'month', 'day']}
                  slots={{
                  }}
                  slotProps={{
                    day: {
                    } as any,
                  }}
                />
                <button onClick={addData}>Add New Event</button>
                {/* <NewOrder open={open} handleClose={handleClose} /> */}
              </DemoItem>
            </DemoContainer>
            <Box className="calendarinfo">
              {data.map((item: any) => (
                <div className="eventinfo" key={item.id}>
                  <p>{item.customer_name}</p>
                  <p>{item.order_start_date}</p>
                  <p>{item.message}</p>
                  <button>Edit</button>
                  <button onClick={() => deleteData(item.id)}>Delete</button>
                </div>
              ))}
            </Box>
          </LocalizationProvider>
        </Box>
      </div>
    </div>
  );
}
