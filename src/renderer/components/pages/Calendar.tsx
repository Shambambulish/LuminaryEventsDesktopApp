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



export function Calendar() {
  const [value, setValue] = useState<Dayjs | null>(dayjs());
  const [data, setData] = useState<EventInterface[]>([]);
  //dayjs.locale('fi')

  const onDateSelect = (event: any) => {
    setValue(event);
    let onlyDate = dayjs(event.$d).toISOString();
    console.log('onlyDate: ', onlyDate)
    fetchSelectedData(onlyDate);
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

  const fetchSelectedData = async (onlyDate: any) => {
    try {
      const response = await _get(`orders/between/:${onlyDate}/:${onlyDate}`, { headers: { Authorization: 'Bearer your_token_here' } });
      setData(response.data);
      console.log("Responding: ", response);
      console.log("Fetched data: ", response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle errors
    }
  };

  const addData = async () => {
    try {
      const newData = { name: 'New Item' };
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
      fetchData(); // Refresh data after deleting
    } catch (error) {
      console.error('Error deleting data:', error);
      // Handle errors
    }
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
                <button>Add New Event</button>
              </DemoItem>
            </DemoContainer>
            <Box className="calendarinfo">
              {data.map((item: any) => (
                <div className="eventinfo" key={item.id}>
                  <p>{item.customer_name}</p>
                  <p>{item.order_start_date}</p>
                  <p>{item.message}</p>
                  <button>Edit</button>
                  <button>Delete</button>
                </div>
              ))}
            </Box>
          </LocalizationProvider>
        </Box>
      </div>
    </div>
  );
}
