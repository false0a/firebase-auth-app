import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Home"
import MainPage from "./MainPage"

function App() {
    return (
        <Router>
            <Routes>
                {/* 기본 로그인 페이지 (Vercel에서 iframe으로 연결됨) */}
                <Route path="/" element={<Home />} />
                {/* 로그인 성공 후 이동할 페이지 */}
                <Route path="/main" element={<MainPage />} />
            </Routes>
        </Router>
    )
}

export default App // ✅ 반드시 있어야 함!
