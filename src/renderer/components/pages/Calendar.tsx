import '../css/Calendar.css';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/fi';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { luminary } from '../Theme';
import { Badge, Box } from '@mui/material';
import { _get, Event } from '../APIconn';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AlertSystem } from '../Alertsystem';
import EventPopUp from '../EventPopUp'


export function Calendar() {
  const navigate = useNavigate();
  const [value, setValue] = useState<Dayjs | null>(dayjs());
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const { showAlert, AlertComponent } = AlertSystem();

  dayjs.locale('fi')

  const onDateSelect = (event: any) => {
    setValue(event);
    let onlyDate = dayjs(event.$d).toISOString();
    console.log('onlyDate: ', onlyDate)
  };

  const handleClick = (path: string) => {
    navigate(path);
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setPopupOpen(true);
  }

  const handleClosePopup = () => {
    setPopupOpen(false);
    setSelectedEvent(null);
  };

  const handleEdit = (updatedEvent: Event) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
    fetchData();
    showAlert('Data updated successfully!', 'success');
  };

  const handleDelete = (eventId: number) => {
    setEvents((prevEvents) => prevEvents.filter((product) => product.id !== eventId));
    fetchData();
    showAlert('Data deleted successfully!', 'success');
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await _get('orders', { headers: { Authorization: 'Bearer your_token_here' } });
      setEvents(response.data);
      console.log("Fetched data: ", response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
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
              <DemoItem>
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
                <button onClick={() => handleClick('/CreateEvent')}>Add New Event</button>
                {/* <NewOrder open={open} handleClose={handleClose} /> */}
              </DemoItem>
            </DemoContainer>
            <Box className="calendarinfo">
              {events.map((event: any) => (
                <Box 
                  className="eventinfo" 
                  key={event.id} onClick={() => handleEventClick(event)}
                  sx={{cursor: 'pointer'}}
                >
                  <p>{event.customer_name}</p>
                  <p>{event.order_start_date.split('T')[0]}</p>
                  <p>{event.message}</p>
                </Box>
              ))}
            </Box>
          </LocalizationProvider>
        </Box>
      </div>
      <EventPopUp open={popupOpen} onClose={handleClosePopup} event={selectedEvent} onEdit={handleEdit} onDelete={handleDelete} onRefresh={fetchData}/>
      <AlertComponent/>
    </div>
  );
}
