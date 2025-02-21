import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"

const auth = getAuth()
const provider = new GoogleAuthProvider()

const handleLogin = async () => {
    try {
        const result = await signInWithPopup(auth, provider)
        console.log("✅ 로그인 성공:", result.user)

        // ✅ 상위 창(Framer)으로 로그인 성공 메시지 전송
        window.parent.postMessage({ type: "loginSuccess" }, "*")
    } catch (error) {
        console.error("❌ 로그인 실패:", error)

        // ✅ 로그인 실패 시 상위 창(Framer)으로 실패 메시지 전송
        window.parent.postMessage({ type: "loginFailure", message: error.message }, "*")
    }
}
