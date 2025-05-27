import firebase_admin
from firebase_admin import credentials, firestore

# 서비스 계정 키로 인증
cred = credentials.Certificate("firebase_key.json")

# firebase 앱 초기화 (인증 + 설정)
firebase_admin.initialize_app(cred)

# firestore 클라이언트 가져오기 (사용 가능)
db = firestore.client()
