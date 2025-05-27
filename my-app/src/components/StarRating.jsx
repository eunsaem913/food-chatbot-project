// src/components/StarRating.jsx
import React from 'react';
import './StarRating.css';

export default function StarRating({ rating, setRating }) {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= rating ? 'filled' : ''}
          onClick={() => setRating(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
}
