import React, { useState } from 'react';
import './PictureSlider.css';

// Placeholder images array
const defaultImages = [
  '/placeholder1.jpg',
  '/placeholder2.jpg',
  '/placeholder3.jpg'
];

const PictureSlider = ({ images = defaultImages }) => {
  const [current, setCurrent] = useState(0);
  const total = images.length;

  // Get three images to display at a time
  const getVisibleImages = () => {
    if (total < 3) return images;
    let visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(images[(current + i) % total]);
    }
    return visible;
  };

  const nextSlide = () => setCurrent((current + 1) % total);
  const prevSlide = () => setCurrent((current - 1 + total) % total);

  return (
    <section className="picture-slider">
      <h2>Photo Gallery</h2>
      <div className="slider-container">
        <button className="slider-btn" onClick={prevSlide}>&lt;</button>
        {getVisibleImages().map((img, idx) => (
          <img key={idx} src={img} alt={`Slide ${current + idx + 1}`} className="slider-img" />
        ))}
        <button className="slider-btn" onClick={nextSlide}>&gt;</button>
      </div>
      <div className="slider-dots">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={idx === current ? 'dot active' : 'dot'}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
      <p style={{marginTop: '1rem', color: '#d6336c'}}>Upload your own images to replace these placeholders.</p>
    </section>
  );
};

export default PictureSlider;
