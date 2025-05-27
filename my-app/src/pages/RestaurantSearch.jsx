import React, { useState } from 'react';

export default function RestaurantSearch() {
  const [address, setAddress] = useState('');
  const [reply, setReply] = useState('');

  const handleSearch = async () => {
    const res = await fetch('http://localhost:8000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: 'test_user',
        messages: [{ role: 'user', content: '추천해줘' }],
        address: address
      })
    });
    const data = await res.json();
    setReply(data.reply);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>📍 주소 기반 맛집 추천 챗봇</h2>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="예: 서울 강남구 역삼동"
        style={{ padding: '8px', width: '300px' }}
      />
      <button onClick={handleSearch} style={{ marginLeft: '10px', padding: '8px' }}>
        추천 받기
      </button>
      <div style={{ marginTop: '20px', whiteSpace: 'pre-wrap' }}>
        {reply}
      </div>
    </div>
  );
}
