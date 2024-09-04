import styled from 'styled-components';

export const CalendarWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  padding: 20px;
`;

export const EventBox = styled.div`
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
`;
