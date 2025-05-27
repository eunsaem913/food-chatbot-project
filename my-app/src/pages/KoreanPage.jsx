import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ 페이지 이동용
import koreanFoods from '../data/KoreanFoods.js';
import './KoreanPage.css';

export default function KoreanPage() {
  const navigate = useNavigate();

  const handleFoodClick = (foodName) => {
    navigate(`/food/${encodeURIComponent(foodName)}`);
  };

  return (
    <div className="korean-page">
      <h2 className="korean-page-title">한식 인기 TOP 100</h2>
      <div className="food-list">
        {koreanFoods.map((food) => (
          <div
            key={food.rank}
            className="food-card"
            onClick={() => handleFoodClick(food.name)} // ✅ 클릭 이벤트 추가
            style={{ cursor: 'pointer' }} // ✅ 마우스 포인터 표시
          >
            <img
              src={food.image}
              alt={food.name}
              className="food-image"
              onError={(e) => {
                e.target.src = '/images/default.jpg';
              }}
            />
            <div className="food-rank">#{food.rank}</div>
            <div className="food-name">{food.name}</div>
          </div>
        ))}
      </div>

      {/* ✅ 챗봇으로 돌아가기 버튼 */}
      <div className="back-button-container">
        <button
          className="back-button"
          onClick={() => navigate('/')}
        >
          ← 챗봇으로 돌아가기
        </button>
      </div>
    </div>
  );
}

