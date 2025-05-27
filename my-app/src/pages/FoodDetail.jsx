import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import { db } from '../firebase';

import koreanFoods from '../data/KoreanFoods';
import koreanFoodDetails from '../data/KoreanFoodDetails';
import japaneseFoods from '../data/japaneseFoods';
import japaneseFoodDetails from '../data/JapaneseFoodDetails';
import chineseFoods from '../data/chineseFoods';
import chineseFoodDetails from '../data/ChineseFoodDetails';
import westernFoods from '../data/westernFoods';
import westernFoodDetails from '../data/WesternFoodDetails';

import Rating from 'react-rating';
import './FoodDetail.css';

export default function FoodDetail() {
  const { foodName } = useParams();
  const navigate = useNavigate();
  const decodedName = decodeURIComponent(foodName);

  const [reviews, setReviews] = useState([]);
  const [username, setUsername] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(null);

  const allFoods = [
    ...koreanFoods,
    ...japaneseFoods,
    ...chineseFoods,
    ...westernFoods,
  ];
  const allDetails = [
    ...koreanFoodDetails,
    ...japaneseFoodDetails,
    ...chineseFoodDetails,
    ...westernFoodDetails,
  ];

  const food = allFoods.find(f => f.name === decodedName);
  const detail = allDetails.find(f => f.name === decodedName);

  useEffect(() => {
    if (decodedName) {
      document.title = `${decodedName} - 음식 상세 정보`;
    }

    const q = query(
      collection(db, 'reviews', decodedName, 'items'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setReviews(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [decodedName]);

  const submitReview = async () => {
    if (!username.trim() || !text.trim()) return;
    await addDoc(collection(db, 'reviews', decodedName, 'items'), {
      username,
      text,
      rating,
      createdAt: new Date()
    });
    setUsername('');
    setText('');
    setRating(5);
  };

  if (!food) {
    return <div>❌ 해당 음식 정보를 찾을 수 없습니다.</div>;
  }

  const merged = {
    ...food,
    ...(detail || {})
  };

  const videoMap = {
    진감: 'PH_-nGRatgo',
    비빔밥: 'PzxlFdU94dI',
    불고기: 'HqYuU4-6aX4',
    제육볶음: 'ECZk4Hoxd2M',
    딩장채객: 'MuHXLW0Fr1Y',
    차징: 'NnXB9i3XKpE',
    라먼: 'vcPZwHysHdA',
    짠장면: 'f93HkdkTPUM',
    스테이크: 'rLIRe9r2S3I',
    파스타: 'iNRCDw3j7fk'
  };

  const youtubeId = videoMap[merged.name];

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : null;

  return (
    <div className="food-detail" style={{ position: 'relative', padding: '20px' }}>
      <div className="back-button-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← 뒤로가기
        </button>
      </div>

      <h2>{merged.name}</h2>

      <img
        src={merged.image}
        alt={merged.name}
        className="food-detail-image"
        onError={(e) => {
          e.target.src = '/images/default.jpg';
          e.target.alt = '이미지를 불러올 수 없습니다.';
        }}
      />

      <p><strong>설명:</strong> {merged.description || '아직 설명이 없어요.'}</p>
      <p><strong>1인분 캘로리:</strong> {merged.calories ? `${merged.calories} kcal` : '정보 없음'}</p>
      <p><strong>레시피:</strong> {merged.recipe || '레시피 준비 중입니다.'}</p>

      {youtubeId && (
        <>
          <h4>조리법 영상</h4>
          <div style={{ marginBottom: '20px' }}>
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title={`${merged.name} 조리법 영상`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </>
      )}

      {/* 리뷰 섹션 */}
      <div style={{ marginTop: '40px' }}>
        <h3>📝 리뷰 작성</h3>

        <div className="review-form">
          <div className="form-group">
            <label>이름</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="예: 홍길동"
            />
          </div>

          <div className="form-group">
            <label>평점</label>
            <Rating
              initialRating={rating}
              onChange={(value) => setRating(parseFloat(value.toFixed(1)))}
              fractions={10}
              emptySymbol={<span className="star">☆</span>}
              fullSymbol={<span className="star filled">★</span>}
              onHover={(value) => setHoverRating(value)}
              onMouseLeave={() => setHoverRating(null)}
            />
            <p style={{ marginTop: '8px' }}>
              {typeof hoverRating === 'number'
                ? `${hoverRating.toFixed(1)}점 (예상)`
                : `${rating}점`}
            </p>

          </div>

          <div className="form-group">
            <label>리뷰 내용</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="어느 점이 좋았는지 알려주세요!"
              rows="4"
            />
          </div>

          <button className="submit-button" onClick={submitReview}>
            리뷰 남기기
          </button>
        </div>

        <h3 style={{ marginTop: '30px' }}>💬 사용자 리뷰</h3>

        {averageRating && (
          <p style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '10px' }}>
            ⭐ 평균 평점: {averageRating} / 5.0 ({reviews.length}개)
          </p>
        )}

        {reviews.length === 0 && <p>아직 리뷰가 없습니다.</p>}
        {reviews.map((r) => (
          <div key={r.id} style={{ borderBottom: '1px solid #ccc', marginBottom: '10px', paddingBottom: '10px' }}>
            <strong>{r.username}</strong> ({r.rating}점)
            <p>{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}