import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BookingCalendar from './components/BookingCalendar';
import { services } from './components/Services';
import './components/BookingCalendar.css';
import './BookingPage.css';


const BookingPage = () => {
  const navigate = useNavigate();
  const [selectedDates, setSelectedDates] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dogImages, setDogImages] = useState([]);
  const [phone, setPhone] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  // For each selected date, store { frequency, times: [time1, time2, ...] }
  const [dateDetails, setDateDetails] = useState({});

  const handleImageChange = e => {
    setDogImages(Array.from(e.target.files));
  };

  const handleFrequencyChange = (date, value) => {
    setDateDetails(prev => {
      const prevEntry = prev[date] || {};
      const oldTimes = Array.isArray(prevEntry.times) ? prevEntry.times : [];
      const newFreq = Number(value) || 0;
      const newTimes = Array.from({ length: newFreq }, (_, i) => oldTimes[i] || '');
      return {
        ...prev,
        [date]: {
          ...prevEntry,
          frequency: value,
          times: newTimes
        }
      };
    });
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

  const handleServiceChange = (date, value) => {
    setDateDetails(prev => ({
      ...prev,
      [date]: {
        ...prev[date],
        service: value,
        times: prev[date]?.times || Array(Number(prev[date]?.frequency) || 0).fill('')
      }
    }));
  };

  const formatPriceForDate = date => {
    const svcTitle = dateDetails[date]?.service;
    if (!svcTitle) return '';
    const svc = services.find(s => s.title === svcTitle);
    if (!svc || !svc.price) return '';
    const base = parseFloat(String(svc.price).replace(/[^0-9.]/g, '')) || 0;
    const freq = Number(dateDetails[date]?.frequency) || 1;
    const total = base * freq;
    const formatted = Number.isInteger(total) ? String(total) : total.toFixed(2);
    return `$${formatted}`;
  };

  const computeGrandTotal = () => {
    const getNumericTotalForDate = date => {
      const svcTitle = dateDetails[date]?.service;
      if (!svcTitle) return 0;
      const svc = services.find(s => s.title === svcTitle);
      if (!svc || !svc.price) return 0;
      const base = parseFloat(String(svc.price).replace(/[^0-9.]/g, '')) || 0;
      const freq = Number(dateDetails[date]?.frequency) || 1;
      return base * freq;
    };

    const total = selectedDates.reduce((sum, d) => sum + getNumericTotalForDate(d), 0);
    return Number.isInteger(total) ? `$${total}` : `$${total.toFixed(2)}`;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('selectedDates', JSON.stringify(selectedDates));
      formData.append('dateDetails', JSON.stringify(dateDetails));
      formData.append('additionalNotes', additionalNotes);
      dogImages.forEach(file => formData.append('dogImages', file));

      const res = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        body: formData
      });

      if (!res.ok) throw new Error('Failed to submit booking');

      const data = await res.json();
      if (data.success) {
        alert('Booking submitted!');
        setSelectedDates([]);
        setName('');
        setEmail('');
        setPhone('');
        setDogImages([]);
        setDateDetails({});
        setAdditionalNotes('');
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (err) {
      console.error(err);
      alert('Error submitting booking: ' + err.message);
    }
  };

  return (
    <div className="App">
      <div className="banner">
        <h1>Book a Sitting</h1>
        <button
          style={{
            marginTop: '1rem',
            background: '#fff0f6',
            color: '#d6336c',
            border: '1.5px solid #ffb3c6',
            borderRadius: '0.7rem',
            padding: '0.5rem 1.2rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
          onClick={() => navigate('/')}
        >
          ← Back to Main Page
        </button>
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
                  <div style={{display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'center'}}>
                    <select
                      value={dateDetails[date]?.service || ''}
                      onChange={e => handleServiceChange(date, e.target.value)}
                      className="booking-input"
                      style={{minWidth: 160}}
                    >
                      <option value="">Select service</option>
                      {services.map((s, i) => (
                        <option key={i} value={s.title}>{s.title}</option>
                      ))}
                    </select>
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
                    <div style={{marginLeft: 'auto', color: '#d6336c', fontWeight: 'bold'}}>
                      {formatPriceForDate(date)}
                    </div>
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
          <textarea
            className="booking-textarea"
            value={additionalNotes}
            onChange={e => setAdditionalNotes(e.target.value)}
            placeholder="Additional notes for the sitter (allergies, meds, quirks, feeding instructions...)"
          />
          <div className="dog-image-grid">
            {dogImages.map((img, idx) => (
              <img key={idx} src={URL.createObjectURL(img)} alt="dog" className="dog-image-thumb" />
            ))}
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div style={{color: '#d6336c', fontWeight: 'bold', fontSize: '1.1rem'}}>{computeGrandTotal()}</div>
            <button className="booking-submit" type="submit">Book & Pay</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
