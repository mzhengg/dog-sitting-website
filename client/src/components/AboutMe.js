import React from 'react';
import './AboutMe.css';

const AboutMe = () => (
  <section className="about-me">
    <h2>About Me</h2>
    <div className="about-content">
      <img src="/placeholder-profile.jpg" alt="Your profile" className="about-img" />
      <div>
        <p>Write a description about yourself and your dog sitting experience here.</p>
      </div>
    </div>
  </section>
);

export default AboutMe;
