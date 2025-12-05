import React from 'react';

import './App.css';

import AboutMe from './components/AboutMe';
import PictureSlider from './components/PictureSlider';


import Services from './components/Services';
import Reviews from './components/Reviews';
import Booking from './components/Booking';



function App() {
  return (
    <div className="App">
      <div className="banner">
        <h1>Dog Sitting Service</h1>
        <button className="book-now-btn" onClick={() => window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'})}>
          Book Now
        </button>
      </div>
      <AboutMe />
      <PictureSlider />
      <Services />
      <Reviews />
      <Booking />
    </div>
  );
}

export default App;
