import React, { useState } from 'react';
import './Reviews.css';


const Reviews = () => {
  const [reviews, setReviews] = useState([
    { name: 'Jane Doe', rating: 5, comment: 'Amazing dog sitter! Highly recommend.', image: null },
    { name: 'John Smith', rating: 4, comment: 'Very caring and professional.', image: null }
  ]);
  const [form, setForm] = useState({ name: '', rating: 5, comment: '', image: null });
  const [showModal, setShowModal] = useState(false);

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    setReviews([...reviews, form]);
    setForm({ name: '', rating: 5, comment: '', image: null });
    setShowModal(false);
  };

  return (
    <section className="reviews">
      <h2>Customer Reviews</h2>
      <ul>
        {reviews.map((r, i) => (
          <li key={i} className="review-item">
            <div className="review-header">
              <img src={r.image instanceof File ? URL.createObjectURL(r.image) : r.image || '/placeholder-profile.jpg'} alt="review" className="review-img" />
              <div>
                <strong>{r.name}</strong> <span className="review-stars">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
              </div>
            </div>
            <span>{r.comment}</span>
          </li>
        ))}
      </ul>
      <button className="open-review-modal" onClick={() => setShowModal(true)}>Post a Review</button>

      {showModal && (
        <div className="review-modal-bg" onClick={() => setShowModal(false)}>
          <div className="review-modal" onClick={e => e.stopPropagation()}>
            <h3>Post a Review</h3>
            <form onSubmit={handleSubmit} className="review-form">
              <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
              <input name="image" type="file" accept="image/*" onChange={handleChange} />
              <div className="star-rating-input">
                {[1,2,3,4,5].map(n => (
                  <span
                    key={n}
                    className={n <= form.rating ? 'star selected' : 'star'}
                    onClick={() => setForm({ ...form, rating: n })}
                    style={{ cursor: 'pointer', fontSize: '2rem', color: n <= form.rating ? '#d6336c' : '#e2d6c2' }}
                  >
                    ★
                  </span>
                ))}
              </div>
              <textarea name="comment" value={form.comment} onChange={handleChange} placeholder="Your review" required />
              <button type="submit">Submit Review</button>
              <button type="button" onClick={() => setShowModal(false)} className="close-modal">Cancel</button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Reviews;
