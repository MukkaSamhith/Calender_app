import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useEvents } from '../context/EventContext';
import { CalendarGrid, Button, DayCell, EventItem } from '../styles/styles';

const Calendar = () => {
  const { events } = useEvents();
  const [currentDate, setCurrentDate] = useState(dayjs());
  const navigate = useNavigate();

  const startDay = currentDate.startOf('month').startOf('week');
  const endDay = currentDate.endOf('month').endOf('week');

  const days = [];
  let day = startDay;

  while (day.isBefore(endDay, 'day')) {
    days.push(day);
    day = day.add(1, 'day');
  }

  const eventsForDay = (day) =>
    events.filter((event) => dayjs(event.date).isSame(day, 'day'));

  return (
    <div>
      <h2>{currentDate.format('MMMM YYYY')}</h2>
      <div>
        <Button onClick={() => setCurrentDate(currentDate.subtract(1, 'month'))}>Prev</Button>
        <Button onClick={() => setCurrentDate(currentDate.add(1, 'month'))}>Next</Button>
        <Button onClick={() => navigate('/add')}>Add Event</Button>
      </div>
      <CalendarGrid>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <strong key={d}>{d}</strong>
        ))}
        {days.map((dayItem) => (
          <DayCell
            key={dayItem.format('DD-MM-YYYY')}
            isToday={dayItem.isSame(dayjs(), 'day')}
          >
            {dayItem.format('D')}
            {eventsForDay(dayItem).map((event) => (
              <EventItem
                key={event.id}
                onClick={() => navigate(`/event/${event.id}`)}
              >
                {event.title}
              </EventItem>
            ))}
          </DayCell>
        ))}
      </CalendarGrid>
    </div>
  );
};

export default Calendar;
