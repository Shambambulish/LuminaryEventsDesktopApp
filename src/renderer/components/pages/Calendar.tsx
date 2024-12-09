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
  const [dt, setDt] = useState<Dayjs>();
  const [highlightedDays, setHighlightedDays] = useState<any[]>([]);

  dayjs.locale('fi')

  const onDateSelect = (event: any) => {
    setValue(event);
    let cleandate = dayjs(event.$d).startOf('day');
    console.log('selected day: ', cleandate)
    setDt(cleandate)
  };

  const handleClick = (path: string) => {
    navigate(path);
  };

  const handleEventClick = (item: Event) => {
    setSelectedEvent(item);
    setPopupOpen(true);
  }

  const handleClosePopup = () => {
    setPopupOpen(false);
    setSelectedEvent(null);
  };

  const handleEdit = (updatedEvent: Event) => {
    setEvents((prevEvents) =>
      prevEvents.map((item) =>
        item.id === updatedEvent.id ? updatedEvent : item
      )
    );
    fetchData();
    showAlert('Data updated successfully!', 'success');
  };

  const handleDelete = (eventId: number) => {
    setEvents((prevEvents) => prevEvents.filter((item) => item.id !== eventId));
    fetchData();
    showAlert('Data deleted successfully!', 'success');
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await _get('orders', { headers: { Authorization: 'Bearer your_token_here' } });
      console.log("Fetched data: ", response.data);
      setEvents(response.data);
      console.log("Saved data: ", events);
      setHighlightedDays(response.data.map((item: any) => (item.order_start_date.split('T')[0])));
      console.log("Days to Highlight: ", highlightedDays);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle errors
    }
  };

function ServerDay(props: PickersDayProps<Dayjs> & { highlightedDays?: string[] }) {
  
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const counter = {};
  highlightedDays.forEach((x) => {counter[x] = (counter[x] || 0) + 1;});

  const isSelected =
    !props.outsideCurrentMonth && highlightedDays.includes(day.format("YYYY-MM-DD"));

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? counter[day.format("YYYY-MM-DD")] : undefined}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}

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
                    day: ServerDay
                  }}
                  slotProps={{
                    day: {
                      highlightedDays,
                    } as any,
                  }}
                />
                <button onClick={() => handleClick('/CreateEvent')}>Add New Event</button>
                {/* <NewOrder open={open} handleClose={handleClose} /> */}
              </DemoItem>
            </DemoContainer>
            <Box className="calendarinfo">
              {events
                .filter( item => {
                  let filterPass = true
                  if (item.order_start_date) {
                    filterPass = filterPass && (dayjs(item.order_start_date).startOf('day') <= dt!)
                  }
                  if (item.order_end_date) {
                    filterPass = filterPass && (dayjs(item.order_end_date).startOf('day') >= dt!)
                  }
                  return filterPass
                })
                  .map((item: any) => (
                    <Box 
                      className="eventinfo" 
                      key={item.id} onClick={() => handleEventClick(item)}
                      sx={{cursor: 'pointer'}}
                    >
                      <p>{item.customer_name}</p>
                      <p>{item.order_start_date.split('T')[0]}</p>
                      <p>{item.message}</p>
                    </Box>
                  ))}
            </Box>
          </LocalizationProvider>
        </Box>
      </div>
      <EventPopUp open={popupOpen} onClose={handleClosePopup} item={selectedEvent} onEdit={handleEdit} onDelete={handleDelete} onRefresh={fetchData}/>
      <AlertComponent/>
    </div>
  );
}
