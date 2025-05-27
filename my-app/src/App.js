// src/App.js
import React from 'react';
import Chatbot from './Chatbot';
import KoreanPage from './pages/KoreanPage';
import JapanesePage from './pages/JapanesePage';
import ChinesePage from './pages/ChinesePage';
import WesternPage from './pages/WesternPage';
import FoodDetail from './pages/FoodDetail';
import RestaurantSearch from './pages/RestaurantSearch'; // ✅ 추가
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chatbot />} />
        <Route path="/한식" element={<KoreanPage />} />
        <Route path="/일식" element={<JapanesePage />} />
        <Route path="/중식" element={<ChinesePage />} />
        <Route path="/양식" element={<WesternPage />} />
        <Route path="/food/:foodName" element={<FoodDetail />} />
        <Route path="/맛집검색" element={<RestaurantSearch />} /> {/* ✅ 주소 기반 맛집 검색 추가 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
