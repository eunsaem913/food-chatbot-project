from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime
import requests
import traceback
import re
import json

# -------------------------------
# 환경변수 및 Firebase 설정
# -------------------------------
load_dotenv()

cred_json = os.getenv('GOOGLE_CREDENTIALS_JSON')
if cred_json:
    cred_dict = json.loads(cred_json)
    cred = credentials.Certificate(cred_dict)
    firebase_admin.initialize_app(cred)
    db = firestore.client()
    print("✅ Firebase Admin Initialized")
else:
    print("❌ Firebase Admin Key not found!")
    db = None  # db 객체를 None으로 초기화해서 오류 방지

# -------------------------------
# FastAPI 설정
# -------------------------------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "http://localhost:3002"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------
# 메시지 저장 / 불러오기 함수
# -------------------------------
def save_message(user_id: str, role: str, content: str):
    if db:
        db.collection("chat_history").add({
            "user_id": user_id,
            "role": role,
            "content": content,
            "timestamp": firestore.SERVER_TIMESTAMP
        })

def get_recent_messages(user_id: str, limit=20):
    if db:
        chats = db.collection("chat_history") \
                  .where("user_id", "==", user_id) \
                  .order_by("timestamp", direction=firestore.Query.DESCENDING) \
                  .limit(limit) \
                  .stream()
        return [{"role": c.get("role"), "content": c.get("content")} for c in chats]
    return []

def extract_feedback_messages(history):
    feedback_keywords = ["묻지 마", "묻지마", "왜 자꾸", "하지 마", "하지마", "물어보지 마"]
    return [
        msg["content"]
        for msg in history
        if msg["role"] == "user" and any(keyword in msg["content"] for keyword in feedback_keywords)
    ]

def build_system_prompt_with_feedback(base_prompt: str, feedback_messages):
    if feedback_messages:
        feedback_section = "\n\n🛠️ 지난 대화에서 사용자가 남기는 피드백:\n"
        for fb in feedback_messages:
            feedback_section += f"- {fb}\n"
        feedback_section += "\n이 피드백을 반영해서 이번 대화에서는 같은 실수를 반복하지 마!"
        return base_prompt + feedback_section
    return base_prompt

# -------------------------------
# 기본 system prompt 내용
# -------------------------------
base_prompt = (
    "***넌 첫질문으로 무조건 오늘 하루 기분이 어땠냐고 물어봐야 해***\n"
    "너는 사람들이 뭘 먹고 싶어하는지 도출해 내야 해\n"
    "너는 서비스직이나 다름없기 때문에 항상 친절하게 질문해야 해해\n"
    "실수하면 혼날지도 모르니까 항상 조심해해\n"
    "사용자가 처음 채팅을 친다면 '뭐 먹지?' 하고 고민할 때니까, 상황을 하나씩 물어보고 음식 추천을 도와줘.\n"
    "**절대 '뭐 먹고 싶은거 있나요?' 같은 질문은 하지 말고, 너가 알아서 주도해서 질문 후 받은 답변을 종합해서 음식을 추천해야 해!**\n"
    "질문은 하나씩, 친절하고, 친근하게, 추천은 정보가 충분해졌을 때 **10가지** 리스트로 해줘.\n"
    "**질문이 최소 6개 이상 모이기 전에는 추천하지 마!**\n"
)

# -------------------------------
# 주소 → 위도/경도 변환 함수
# -------------------------------
def geocode_address(address: str):
    try:
        headers = {"Authorization": f"KakaoAK {os.getenv('KAKAO_REST_API_KEY')}"}
        params = {"query": address}
        res = requests.get("https://dapi.kakao.com/v2/local/search/address.json", headers=headers, params=params)
        data = res.json()
        if data["documents"]:
            doc = data["documents"][0]
            return float(doc["y"]), float(doc["x"])
    except:
        pass
    return None, None

# -------------------------------
# Kakao 맛집 검색 함수
# -------------------------------
def search_nearby_restaurants(food_keyword, lat, lng, count=5):
    try:
        headers = {"Authorization": f"KakaoAK {os.getenv('KAKAO_REST_API_KEY')}"}
        params = {
            "query": food_keyword,
            "y": lat,
            "x": lng,
            "radius": 5000,
            "sort": "distance"
        }
        res = requests.get("https://dapi.kakao.com/v2/local/search/keyword.json", headers=headers, params=params)
        data = res.json()
        results = []
        for place in data["documents"][:count]:
            results.append(f"- {place['place_name']} ({place['road_address_name']})")
        return results
    except:
        return []

# -------------------------------
# 음식 키워드 추출 함수
# -------------------------------
def extract_food_keyword(reply_text):
    lines = reply_text.split("\n")
    candidates = []

    for line in lines:
        match = re.match(r"^\s*(\d+[\).]|[-•*])\s*([^\n]+)", line.strip())
        if match:
            candidates.append(match.group(2).strip())
        elif "추천" in line and ":" in line:
            parts = line.split(":")
            if len(parts) == 2:
                candidates.append(parts[1].strip())

    return candidates[0] if candidates else None

# -------------------------------
# GPT 채팅 API
# -------------------------------
@app.post("/chat")
async def chat(request: Request):
    body = await request.json()
    user_id = body.get("user_id", "anonymous")
    messages = body.get("messages", [])
    address = body.get("address", None)

    previous_history = get_recent_messages(user_id)
    feedbacks = extract_feedback_messages(previous_history)
    system_prompt = {
        "role": "system",
        "content": build_system_prompt_with_feedback(base_prompt, feedbacks)
    }

    try:
        from openai import OpenAI
        openai_api_key = os.getenv("OPENAI_API_KEY")
        client = OpenAI(api_key=openai_api_key)

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[system_prompt] + messages
        )

        reply = response.choices[0].message.content.strip()

        for msg in messages:
            save_message(user_id, msg["role"], msg["content"])
        save_message(user_id, "assistant", reply)

        if address:
            lat, lng = geocode_address(address)
            if lat and lng:
                food_keyword = extract_food_keyword(reply) or "비빔밥"
                nearby = search_nearby_restaurants(food_keyword, lat, lng)
                if nearby:
                    reply += "\n\n📍 근처 맛집 추천:\n" + "\n".join(nearby)

        return {"reply": reply}

    except Exception as e:
        traceback.print_exc()
        print("❌ GPT 오류:", e)
        return {"reply": "AI가 잠시 머리가 흐지부지한 것 같아요. 다시 시도해 주세요."}
