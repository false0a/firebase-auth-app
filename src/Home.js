import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { signInWithGoogle } from "./firebase"

function Home() {
    const navigate = useNavigate()
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [showFailureModal, setShowFailureModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const handleLogin = async () => {
        try {
            const user = await signInWithGoogle()
            if (user) {
                setShowSuccessModal(true)
                setTimeout(() => {
                    navigate("/main") // ✅ 로그인 성공 후 /main 이동
                }, 2000)
            }
        } catch (error) {
            setErrorMessage(error.message)
            setShowFailureModal(true)
            setTimeout(() => setShowFailureModal(false), 3000)
        }
    }

    return (
        <div style={{ textAlign: "center", padding: "50px" }}>
            <h1>Google Login</h1>
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

// 스타일
const buttonStyle = {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#4285F4",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
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
    textAlign: "center",
    color: "#fff",
}

export default Home
