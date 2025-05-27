import React from 'react';
import chineseFoods from '../data/chineseFoods.js';
import './KoreanPage.css'; // 공통 스타일 재사용
import { useNavigate } from 'react-router-dom';

export default function ChinesePage() {
  const navigate = useNavigate();

  const handleFoodClick = (foodName) => {
    navigate(`/food/${encodeURIComponent(foodName)}`);
  };

  return (
    <div className="korean-page" style={{ position: 'relative' }}>
      {/* 좌측 상단 뒤로가기 버튼 */}
      <div className="back-button-container">
        <button className="back-button" onClick={() => navigate('/')}>
          ← 챗봇으로 돌아가기
        </button>
      </div>

      <h2 className="korean-page-title">중식 인기 TOP 100</h2>
      <div className="food-list">
        {chineseFoods.map((food) => (
          <div
            key={food.rank}
            className="food-card"
            onClick={() => handleFoodClick(food.name)} // ✅ 클릭 시 상세 페이지 이동
            style={{ cursor: 'pointer' }}
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
    </div>
  );
}

