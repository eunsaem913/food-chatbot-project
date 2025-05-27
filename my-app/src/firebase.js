// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCp46WkZR2nbSGtskNabK17beYDCciU-Es",
  authDomain: "food-chatbot-web.firebaseapp.com",
  projectId: "food-chatbot-web",
  storageBucket: "food-chatbot-web.appspot.com",
  messagingSenderId: "988267365222",
  appId: "1:988267365222:web:6ebc9d02cf4b86970afea7",
  measurementId: "G-HV94CE7JHE"
};

console.log("✅ Firebase 초기화 성공"); // ✅ 이 줄을 여기!

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
