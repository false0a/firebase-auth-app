import React, { useState } from "react"
// 🔹 Firebase SDK
import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"

// 1) Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyDZaaHJwsIA34Kwx1Uz7m1ZuaUCBldS-Lk",
  authDomain: "ploka-be736.firebaseapp.com",
  projectId: "ploka-be736",
  storageBucket: "ploka-be736.appspot.com",
  messagingSenderId: "834946972945",
  appId: "1:834946972945:web:554deb37314634d3f660b0",
}

// 2) Firebase 초기화
initializeApp(firebaseConfig)
const auth = getAuth()
const provider = new GoogleAuthProvider()

function App() {
  // 🔹 토스트 UI 상태
  const [toastVisible, setToastVisible] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastColor, setToastColor] = useState("#4caf50") // 기본 초록색(성공)

  // 토스트 표시 함수
  const showToast = (message, isError = false, duration = 2000) => {
    setToastMessage(message)
    setToastColor(isError ? "#f44336" : "#4caf50") // 실패면 빨강, 성공이면 초록
    setToastVisible(true)
    setTimeout(() => {
      setToastVisible(false)
    }, duration)
  }

  // 🔹 구글 로그인 버튼 클릭 시
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      console.log("✅ 로그인 성공:", result.user)

      // 1) 토스트로 "로그인 성공" 표시 (2초)
      showToast("로그인 성공!", false, 2000)

      // 2) 2초 후 프레이머 /main 페이지로 이동
      setTimeout(() => {
        window.top.location.href = "https://moccasin-room-455176.framer.app/main"
      }, 2000)
    } catch (error) {
      console.error("❌ 로그인 실패:", error)
      // 실패 토스트 (3초)
      showToast(error.message || "로그인 실패!", true, 3000)
    }
  }

  return (
    <div style={containerStyle}>
      {/* 🔹 로고 */}
      <div style={logoContainerStyle}>
        <img
          src="https://your-logo-url.com/logo.png" // 🔹 로고 이미지 URL 추가
          alt="Plocka Logo"
          style={logoStyle}
        />
      </div>

      {/* 🔹 구글 로그인 버튼 */}
      <button onClick={handleLogin} style={googleButtonStyle}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
          alt="Google Logo"
          style={{ width: 20, marginRight: 8 }}
        />
        Sign in with Google
      </button>

      {/* 🔹 토스트 (화면 하단 고정) */}
      {toastVisible && (
        <div style={{ ...toastStyle, backgroundColor: toastColor }}>
          {toastMessage}
        </div>
      )}
    </div>
  )
}

export default App

// 🔹 스타일들

// 전체 화면 설정
const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  fontFamily: "Arial, sans-serif",
  position: "relative", // 버튼 위치 조정용
}

// 🔹 로고 스타일
const logoContainerStyle = {
  position: "absolute",
  top: "25%", // 화면 상단에서 25% 지점
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}

const logoStyle = {
  width: "100px", // 로고 크기 조절 가능
  marginBottom: "20px",
}

// 🔹 구글 로그인 버튼 스타일 (중앙 하단 배치)
const googleButtonStyle = {
  position: "absolute",
  bottom: "15%", // 화면 하단에서 15% 지점에 위치
  display: "inline-flex",
  alignItems: "center",
  backgroundColor: "#fff",
  color: "#444",
  border: "1px solid #ddd",
  borderRadius: 24, // pill 모양
  padding: "10px 20px",
  fontSize: 14,
  cursor: "pointer",
  boxShadow: "0 2px 2px rgba(0,0,0,0.2)",
}

// 🔹 토스트 (화면 하단)
const toastStyle = {
  position: "fixed",
  bottom: 20,
  left: "50%",
  transform: "translateX(-50%)",
  color: "#fff",
  padding: "10px 16px",
  borderRadius: 4,
  fontSize: 14,
  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
  zIndex: 9999,
}
