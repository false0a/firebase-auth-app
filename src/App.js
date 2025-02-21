import React, { useState } from "react"

// 예시용 Firebase 로그인 함수 (실제 구현 시 firebase.js에서 import해서 사용)
async function signInWithGoogle() {
  // 여기에 실제 Firebase 구글 로그인 로직 (signInWithPopup 등) 추가
  // 성공 시 user 객체 반환, 실패 시 throw error
  return new Promise((resolve, reject) => {
    const isSuccess = true // 테스트용 (실제로는 Firebase 로그인 결과에 따라 true/false)
    setTimeout(() => {
      if (isSuccess) {
        resolve({ displayName: "사용자", email: "test@example.com" })
      } else {
        reject(new Error("로그인에 실패했습니다."))
      }
    }, 1000)
  })
}

function App() {
  const [toastMessage, setToastMessage] = useState("")
  const [toastType, setToastType] = useState("success") // "success" | "error"
  const [toastVisible, setToastVisible] = useState(false)

  // 토스트 표시 함수
  const showToast = (message, type = "success", duration = 2000) => {
    setToastMessage(message)
    setToastType(type)
    setToastVisible(true)
    // 지정된 시간 후 토스트 숨김
    setTimeout(() => {
      setToastVisible(false)
    }, duration)
  }

  const handleLogin = async () => {
    try {
      const user = await signInWithGoogle()
      console.log("✅ 로그인 성공:", user)

      // 성공 토스트 2초 표시
      showToast("로그인 성공!", "success", 2000)

      // 2초 후 Framer /main 페이지로 이동
      setTimeout(() => {
        window.top.location.href = "https://moccasin-room-455176.framer.app/main"
      }, 2000)
    } catch (error) {
      console.error("❌ 로그인 실패:", error)
      // 실패 토스트 3초 표시
      showToast(error.message || "로그인 실패!", "error", 3000)
    }
  }

  return (
    <div style={containerStyle}>
      {/* (선택) 상단 영역 */}
      <div style={headerStyle}>
        <h2>Google Login</h2>
        <p>필요없는 문구 대신 원하는 안내 텍스트를 쓰세요.</p>
      </div>

      {/* 구글 로그인 버튼 (화면 하단 근처) */}
      <div style={bottomAreaStyle}>
        <button onClick={handleLogin} style={googleButtonStyle}>
          <img
            src="https://e7.pngegg.com/pngimages/734/947/png-clipart-google-logo-google-g-logo-icons-logos-emojis-tech-companies-thumbnail.png"
            alt="G"
            style={{ width: 20, marginRight: 8 }}
          />
          Sign in with Google
        </button>
      </div>

      {/* 토스트바 (화면 하단 고정) */}
      {toastVisible && (
        <div
          style={{
            ...toastStyle,
            backgroundColor: toastType === "success" ? "#4caf50" : "#f44336",
          }}
        >
          {toastMessage}
        </div>
      )}
    </div>
  )
}

export default App

// 전체 컨테이너: 세로 100vh, 아래쪽에 버튼 위치
const containerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  height: "100vh",
  margin: 0,
  padding: 0,
}

// 상단 영역
const headerStyle = {
  marginTop: 40,
  textAlign: "center",
}

// 하단 버튼 영역
const bottomAreaStyle = {
  marginBottom: 60, // 버튼이 화면 하단에서 60px 정도 위에 위치
}

// 구글 로그인 버튼 스타일
const googleButtonStyle = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "#fff",
  color: "#444",
  border: "1px solid #ccc",
  borderRadius: 4,
  padding: "10px 20px",
  fontSize: 16,
  cursor: "pointer",
  boxShadow: "0 2px 2px rgba(0,0,0,0.2)",
}

// 토스트 스타일 (하단 고정)
const toastStyle = {
  position: "fixed",
  bottom: 20,
  left: "50%",
  transform: "translateX(-50%)",
  color: "#fff",
  padding: "12px 20px",
  borderRadius: 4,
  fontSize: 16,
  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
  zIndex: 9999,
}
