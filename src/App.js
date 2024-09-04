import React from 'react';
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom';
import { EventProvider } from './context/EventContext';
import { Container } from './styles/styles';
import Calendar from './components/Calendar';
import EventForm from './components/EventForm';
import EventDetails from './components/EventDetails';

const App = () => (
  <Router>
    <EventProvider>
      <Container>
      <Routes>
    <Route path="/" element={<Calendar />} />
    <Route path="/add" element={<EventForm />} />
    <Route path="/edit/:id" element={<EventForm />} />
    <Route path="/event/:id" element={<EventDetails />} />
  </Routes>
      </Container>
    </EventProvider>
  </Router>
);

export default App;
