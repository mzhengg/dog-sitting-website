import React from 'react';

import './App.css';

import AboutMe from './components/AboutMe';
import PictureSlider from './components/PictureSlider';


import Services from './components/Services';
import Reviews from './components/Reviews';




function App() {
  return (
    <div className="App">
      <div className="banner">
        <h1>Dog Sitting Service</h1>
        <button className="book-now-btn" onClick={() => window.location.href = '/book'}>
          Book Now
        </button>
      </div>
      <AboutMe />
      <PictureSlider />
      <Services />
      <Reviews />
    </div>
  );
}

export default App;
