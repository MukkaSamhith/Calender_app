import React, { createContext, useState, useEffect, useContext } from 'react';

const EventContext = createContext();

export const useEvents = () => useContext(EventContext);

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState(() => {
    const localData = localStorage.getItem('events');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const addEvent = (event) => setEvents([...events, event]);

  const updateEvent = (updatedEvent) =>
    setEvents(events.map((event) => (event.id === updatedEvent.id ? updatedEvent : event)));

  const deleteEvent = (id) => setEvents(events.filter((event) => event.id !== id));

  return (
    <EventContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventContext.Provider>
  );
};
