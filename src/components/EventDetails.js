import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import { Button } from '../styles/styles';

const EventDetails = () => {
  const { events, deleteEvent } = useEvents();
  const { id } = useParams();
  const event = events.find((event) => event.id === id);
  const navigate = useNavigate();

  if (!event) return <p>Event not found.</p>;

  const handleDelete = () => {
    deleteEvent(id);
    navigate('/');
  };

  return (
    <div>
      <h2>{event.title}</h2>
      <p>Date: {event.date}</p>
      <p>Category: {event.category}</p>
      <Button onClick={() => navigate(`/edit/${event.id}`)}>Edit</Button>
      <Button onClick={handleDelete}>Delete</Button>
      <Button onClick={() => navigate('/')}>Back to Calendar</Button>
    </div>
  );
};

export default EventDetails;
