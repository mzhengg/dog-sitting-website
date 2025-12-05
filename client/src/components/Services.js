import React from 'react';
import './Services.css';

const services = [
  { title: 'Dog Walking', description: 'Daily walks tailored to your dog’s needs.' },
  { title: 'Overnight Sitting', description: 'Safe and comfortable overnight care.' },
  { title: 'Drop-In Visits', description: 'Quick check-ins for feeding, play, and potty breaks.' },
  { title: 'Puppy Care', description: 'Special attention for puppies and young dogs.' }
];

const Services = () => (
  <section className="services">
    <h2>My Services</h2>
    <div className="services-list">
      {services.map((service, idx) => (
        <div key={idx} className="service-card">
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Services;
