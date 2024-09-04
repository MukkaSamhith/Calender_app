import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import { Form, Input, Select, Button } from '../styles/styles';

const EventForm = () => {
  const { events, addEvent, updateEvent } = useEvents();
  const { id } = useParams();
  const isEditing = Boolean(id);
  const existingEvent = events.find((event) => event.id === id);
  const [title, setTitle] = useState(existingEvent ? existingEvent.title : '');
  const [date, setDate] = useState(existingEvent ? existingEvent.date : '');
  const [category, setCategory] = useState(existingEvent ? existingEvent.category : 'Work');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventData = {
      id: isEditing ? existingEvent.id : Date.now().toString(),
      title,
      date,
      category,
    };
    isEditing ? updateEvent(eventData) : addEvent(eventData);
    navigate('/');
  };

  return (
    <div>
      <h2>{isEditing ? 'Edit Event' : 'Add Event'}</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </Select>
        <Button type="submit">{isEditing ? 'Update' : 'Add'} Event</Button>
        <Button type="button" onClick={() => navigate('/')}>
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default EventForm;
