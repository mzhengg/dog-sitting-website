import React, { useState } from 'react';
import './Booking.css';

const Booking = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    alert('Booking submitted! (Stripe payment integration placeholder)');
    setDate(''); setTime(''); setName(''); setEmail('');
  };

  return (
    <section className="booking">
      <h2>Book a Sitting</h2>
      <form onSubmit={handleSubmit} className="booking-form">
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" required />
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your Email" required />
        <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
        <input type="time" value={time} onChange={e => setTime(e.target.value)} required />
        <button type="submit">Book & Pay</button>
      </form>
      <div className="stripe-placeholder">
        <p>Stripe payment integration will go here.</p>
      </div>
    </section>
  );
};

export default Booking;
