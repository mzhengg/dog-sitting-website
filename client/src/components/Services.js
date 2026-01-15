import React from 'react';
import './Services.css';

const services = [
  { title: 'Dog Walking', description: 'Daily walks tailored to your dog’s needs.', price: '$20/walk' },
  { title: 'Overnight Sitting', description: 'Safe and comfortable overnight care.', price: '$60/night' },
  { title: 'Drop-In Visits', description: 'Quick check-ins for feeding, play, and potty breaks.', price: '$18/visit' },
  { title: 'Puppy Care', description: 'Special attention for puppies and young dogs.', price: '$25/visit' }
];

const Services = () => (
  <section className="services">
    <h2>My Services</h2>
    <div className="services-list">
      {services.map((service, idx) => (
        <div key={idx} className="service-card">
          <h3>{service.title}</h3>
          <p>{service.description}</p>
          <div className="service-price" style={{marginTop: '1rem', fontWeight: 'bold', color: '#d6336c'}}>{service.price}</div>
        </div>
      ))}
    </div>
  </section>
);

export default Services;
