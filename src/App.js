import React, { useState } from "react"
import { signInWithGoogle } from "./firebase"

function App() {
    const [user, setUser] = useState(null)

    const handleLogin = async () => {
        const loggedInUser = await signInWithGoogle()
        if (loggedInUser) {
            setUser(loggedInUser)
        }
    }

    return (
        <div style={{ textAlign: "center", padding: "50px" }}>
            <h1>Google Login</h1>
            {user ? (
                <div>
                    <p>✅ 로그인 성공: {user.displayName}</p>
                    <img src={user.photoURL} alt="profile" width="50" />
                </div>
            ) : (
                <button onClick={handleLogin} style={{ padding: "10px 20px", fontSize: "16px" }}>
                    Sign in with Google
                </button>
            )}
        </div>
    )
}

export default App
