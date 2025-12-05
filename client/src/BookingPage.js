import React, { useState } from 'react';

import BookingCalendar from './components/BookingCalendar';
import './components/BookingCalendar.css';
import './BookingPage.css';


const BookingPage = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dogImages, setDogImages] = useState([]);
  const [phone, setPhone] = useState('');
  // For each selected date, store { frequency, times: [time1, time2, ...] }
  const [dateDetails, setDateDetails] = useState({});

  const handleImageChange = e => {
    setDogImages(Array.from(e.target.files));
  };

  const handleFrequencyChange = (date, value) => {
    setDateDetails(prev => ({
      ...prev,
      [date]: {
        frequency: value,
        times: Array(Number(value) || 0).fill('')
      }
    }));
  };

  const handleTimeChange = (date, idx, value) => {
    setDateDetails(prev => ({
      ...prev,
      [date]: {
        ...prev[date],
        times: prev[date].times.map((t, i) => i === idx ? value : t)
      }
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Placeholder: handle booking submission
    alert('Booking submitted!');
    setSelectedDates([]);
    setName('');
    setEmail('');
    setPhone('');
    setDogImages([]);
    setDateDetails({});
  };

  return (
    <div className="App">
      <div className="banner">
        <h1>Book a Sitting</h1>
      </div>
      <div className="booking-layout">
        <div className="booking-calendar-side">
          <BookingCalendar selectedDates={selectedDates} setSelectedDates={setSelectedDates} />
          {selectedDates.length > 0 && (
            <div style={{marginTop: '2rem'}}>
              <label style={{fontWeight: 'bold', color: '#d6336c', display: 'block', marginBottom: '1.5rem'}}>For each selected day, specify number of sittings and times:</label>
              {selectedDates.map(date => (
                <div key={date} style={{marginBottom: '1.5rem', background: '#ffe0ef', borderRadius: '0.7rem', padding: '1rem', border: '1.5px solid #ffb3c6'}}>
                  <div style={{marginBottom: '0.5rem'}}>
                    <strong>{date}</strong>
                  </div>
                  <div style={{display: 'flex', gap: '1rem', marginBottom: '1rem'}}>
                    {[1,2,3].map(n => (
                      <button
                        key={n}
                        type="button"
                        className={dateDetails[date]?.frequency === String(n) ? 'booking-input selected' : 'booking-input'}
                        style={{width: 50, textAlign: 'center', background: dateDetails[date]?.frequency === String(n) ? '#d6336c' : '#fff', color: dateDetails[date]?.frequency === String(n) ? '#fff' : '#d6336c', border: '1.5px solid #ffb3c6', borderRadius: '0.7rem', cursor: 'pointer'}}
                        onClick={() => handleFrequencyChange(date, String(n))}
                      >
                        {n}
                      </button>
                    ))}
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      className="booking-input"
                      style={{width: 60}}
                      value={dateDetails[date]?.frequency && !['1','2','3'].includes(dateDetails[date]?.frequency) ? dateDetails[date]?.frequency : ''}
                      onChange={e => handleFrequencyChange(date, e.target.value.replace(/\D/g, ''))}
                      placeholder="Custom"
                      autoComplete="off"
                    />
                  </div>
                  {dateDetails[date]?.frequency && Number(dateDetails[date]?.frequency) > 0 && (
                    <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                      {[...Array(Number(dateDetails[date]?.frequency))].map((_, idx) => (
                        <div key={idx} style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                          <span style={{color: '#d6336c'}}>Sitting {idx + 1}:</span>
                          <input
                            type="time"
                            className="booking-input"
                            value={dateDetails[date]?.times[idx] || ''}
                            onChange={e => handleTimeChange(date, idx, e.target.value)}
                            required
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <form className="booking-form" onSubmit={handleSubmit}>
          <input className="booking-input" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" required />
          <input className="booking-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your Email" required />
          <input className="booking-input" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Your Phone Number" required pattern="[0-9\-\+\s\(\)]*" />
          <label className="upload-label">
            <span>Upload Dog Pictures</span>
            <input type="file" multiple accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
          </label>
          <div className="dog-image-grid">
            {dogImages.map((img, idx) => (
              <img key={idx} src={URL.createObjectURL(img)} alt="dog" className="dog-image-thumb" />
            ))}
          </div>
          <button className="booking-submit" type="submit">Book & Pay</button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
