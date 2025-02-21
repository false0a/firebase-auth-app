import React, { useState } from "react"
import { signInWithGoogle } from "./firebase"

function App() {
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showFailureModal, setShowFailureModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleLogin = async () => {
    try {
      const user = await signInWithGoogle()
      console.log("✅ 로그인 성공:", user)
      // 로그인 성공 시, 성공 모달 표시
      setShowSuccessModal(true)

      // 2초 뒤에 **Framer /main** 페이지로 최상위 창 이동
      setTimeout(() => {
        window.top.location.href = "https://moccasin-room-455176.framer.app/main"
      }, 2000)
    } catch (error) {
      console.error("❌ 로그인 실패:", error)
      setErrorMessage(error.message)
      setShowFailureModal(true)
    }
  }

  return (
    <div style={containerStyle}>
      <h1>Google Login (Vercel)</h1>
      <button onClick={handleLogin} style={buttonStyle}>
        Sign in with Google
      </button>

      {/* 로그인 성공 모달 */}
      {showSuccessModal && (
        <div style={modalOverlayStyle}>
          <div style={modalBoxStyle}>
            <h2>로그인 성공!</h2>
            <p>잠시 후 /main 페이지로 이동합니다...</p>
          </div>
        </div>
      )}

      {/* 로그인 실패 모달 */}
      {showFailureModal && (
        <div style={modalOverlayStyle}>
          <div style={modalBoxStyle}>
            <h2>로그인 실패</h2>
            <p>{errorMessage}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

const containerStyle = {
  textAlign: "center",
  padding: "50px",
}

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  backgroundColor: "#4285F4",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
}

const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

const modalBoxStyle = {
  background: "#333",
  padding: "20px",
  borderRadius: "8px",
  color: "#fff",
  textAlign: "center",
}
