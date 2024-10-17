import "../css/Calendar.css";
import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/fi';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { luminary } from '../Theme';
import { Box } from '@mui/material';

export function Calendar() {
  const event_picked = "Tapahtuma 15.7.2024 ";
  const event_orderer = "Matti Meikäläinen";
  const order_info = "Tarvin kaasupullon ja pullonmaitoa keikalle";
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
      <DemoContainer components={['DateCalendar', 'DateCalendar', 'DateCalendar']}>
        <DemoItem label={'Tässä o kalenteri :D'}>
          <DateCalendar
            defaultValue={dayjs()}
            views={['year', 'month', 'day']}
          />
        </DemoItem>
      </DemoContainer>
      <Box className="calendarinfo"
      sx={{
        backgroundColor: luminary.palette.primary.main,
      }}
      >
      <div>
      <p> {event_picked} </p>
      <p> {event_orderer} </p>  
      <p> {order_info} </p>
      </div>
      </Box>
    </LocalizationProvider>
    </Box>
      </div>
      </div>
    );
  }
  