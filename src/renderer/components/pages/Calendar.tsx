import "../css/calendar.css";
import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/fi';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { luminary } from '../theme';
import { Box } from '@mui/material';

export function Calendar() {
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
    </LocalizationProvider>
    </Box>
      </div>
      </div>
    );
  }
  