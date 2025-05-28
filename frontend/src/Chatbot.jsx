import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const foodCategories = {
  한식: [
    { name: "비빔밥", reason: "다양한 채소와 고기를 한 그릇에 담아 건강하고 맛있어요." },
    { name: "김치찌개", reason: "칼칼하고 매콤한 국물이 밥 도둑을 확 끌어당겨요." },
    { name: "불고기", reason: "달콤짭짤한 고기 맛이 남녀노소 누구나 좋아하는 한식이에요." },
    { name: "제육볶음", reason: "매콤한 고기 요리로 입맛 없을 때 최고예요." },
    { name: "된장찌개", reason: "구수한 맛으로 속을 든든하게 채워줘요." },
  ],
  일식: [
    { name: "초밥", reason: "신선한 생선과 밥의 조화로 가볍지만 근사한 식사예요." },
    { name: "라멘", reason: "진한 육수와 쫄깃한 면발의 조합이 매력적이에요." },
    { name: "가츠동", reason: "바삭한 돈가스와 달콤한 양념이 최고의 한 끼예요." },
    { name: "우동", reason: "굵은 면발과 따뜻한 국물로 마음이 포근해져요." },
    { name: "규동", reason: "소고기와 양파의 감칠맛이 가득한 덮밥이에요." },
  ],
  중식: [
    { name: "훠궈", reason: "뜨끈한 육수에 고기, 야채, 해산물을 취향껏 담가 먹는 중국 대표 전골요리예요." },
    { name: "마라샹궈", reason: "얼얼하게 매운 마라 소스에 여러 재료를 볶아내는 요리예요." },
    { name: "샤오롱바오", reason: "얇은 피 속에 육즙이 가득! 한입에 넣으면 국물이 톡 터지는 찐만두예요." },
    { name: "궈바로우", reason: "겉은 바삭, 속은 촉촉한 돼지고기에 새콤달콤한 소스를 입힌 요리예요." },
    { name: "궁보지딩", reason: "닭고기와 땅콩, 고추를 넣고 볶은 매콤달콤한 쓰촨요리예요." },
  ],
  양식: [
    { name: "스테이크", reason: "고기의 풍미가 살아있는 고급 서양식 요리에요." },
    { name: "파스타", reason: "다양한 소스와 면의 조화가 매력적인 요리에요." },
    { name: "피자", reason: "치즈와 토핑이 가득한 모두의 인기 음식이에요." },
    { name: "샐러드", reason: "가볍고 건강하게 한 끼를 해결할 수 있어요." },
    { name: "버거", reason: "든든하게 먹을 수 있는 간편한 서양식 메뉴에요." },
  ]
};

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { role: 'user', content: userInput }];
    setMessages(newMessages);
    setUserInput('');

    try {
      const res = await fetch('https://food-chatbot-project.onrender.com/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: "test_user",
          messages: newMessages,
          address: userAddress
        })
      });


      if (!res.ok) throw new Error("서버 응답 오류");

      const data = await res.json();
      const botReply = { role: 'assistant', content: data.reply || "응답 없음" };
      setMessages(prev => [...prev, botReply]);
    } catch (error) {
      console.error("서버 호출 오류:", error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "❌ 서버에 연결할 수 없습니다. 나중에 다시 시도해주세요."
      }]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  const handleSidebarCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="container">
      <div className="sidebar">
        {Object.keys(foodCategories).map((category) => (
          <button
            key={category}
            className="sidebar-button"
            onClick={() => handleSidebarCategoryClick(category)}
          >
            {category} TOP5
          </button>
        ))}
      </div>

      <div className="chat-wrapper">
        <div className="nav-bar">
          <ul className="nav-menu">
            {Object.keys(foodCategories).map((category) => (
              <li
                key={category}
                className="nav-item"
                onClick={() => navigate(`/${category}`)}
              >
                {category} TOP100
              </li>
            ))}
          </ul>
        </div>

        <div className="chat-header">
          <h1 className="chat-title">AI 셰프와 대화해보세요! 무엇을 먹을지 추천해드립니다!</h1>
          <div className="address-input">
            <label>주소 입력: </label>
            <input
              type="text"
              value={userAddress}
              onChange={(e) => setUserAddress(e.target.value)}
              placeholder="예: 서울 강남구 테헤란로 212"
            />
          </div>
        </div>

        <div className="chat-box">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-row ${msg.role === 'user' ? 'user' : 'bot'}`}>
              {msg.role === 'assistant' && (
                <img src="/cat.jpg" alt="cat" className="chat-avatar" />
              )}
              <div className={`chat-bubble ${msg.role === 'user' ? 'user' : 'bot'}`}>
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-section">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="메시지를 입력하세요"
          />
          <button onClick={sendMessage}>전송</button>
        </div>
      </div>

      <div className="food-list-panel">
        {selectedCategory && (
          <>
            <h3>{selectedCategory} 인기 음식</h3>
            {foodCategories[selectedCategory].map((item, i) => (
              <div key={i} className="food-card">
                <strong>{item.name}</strong>
                <p>{item.reason}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
