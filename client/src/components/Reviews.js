import React, { useState } from 'react';
import './Reviews.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([
    { name: 'Jane Doe', rating: 5, comment: 'Amazing dog sitter! Highly recommend.' },
    { name: 'John Smith', rating: 4, comment: 'Very caring and professional.' }
  ]);
  const [form, setForm] = useState({ name: '', rating: 5, comment: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setReviews([...reviews, form]);
    setForm({ name: '', rating: 5, comment: '' });
  };

  return (
    <section className="reviews">
      <h2>Customer Reviews</h2>
      <ul>
        {reviews.map((r, i) => (
          <li key={i}>
            <strong>{r.name}</strong> - {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}<br />
            <span>{r.comment}</span>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="review-form">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
        <select name="rating" value={form.rating} onChange={handleChange}>
          {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} Star{n>1?'s':''}</option>)}
        </select>
        <textarea name="comment" value={form.comment} onChange={handleChange} placeholder="Your review" required />
        <button type="submit">Submit Review</button>
      </form>
    </section>
  );
};

export default Reviews;
