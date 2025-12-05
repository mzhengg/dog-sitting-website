import React, { useState } from 'react';
import './BookingCalendar.css';

const getMonthDays = (year, month) => {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

const BookingCalendar = ({ selectedDates, setSelectedDates }) => {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const days = getMonthDays(year, month);

  const toggleDate = date => {
    const dateStr = date.toISOString().split('T')[0];
    setSelectedDates(selectedDates.includes(dateStr)
      ? selectedDates.filter(d => d !== dateStr)
      : [...selectedDates, dateStr]);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={() => setMonth(month === 0 ? 11 : month - 1)}>&lt;</button>
        <span>{today.toLocaleString('default', { month: 'long' })} {year}</span>
        <button onClick={() => setMonth(month === 11 ? 0 : month + 1)}>&gt;</button>
      </div>
      <div className="calendar-grid">
        {days.map(day => {
          const dateStr = day.toISOString().split('T')[0];
          return (
            <div
              key={dateStr}
              className={selectedDates.includes(dateStr) ? 'calendar-day selected' : 'calendar-day'}
              onClick={() => toggleDate(day)}
            >
              {day.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookingCalendar;
