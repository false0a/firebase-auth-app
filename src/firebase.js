import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyDZaaHJwsIA34Kwx1Uz7m1ZuaUCBldS-Lk",
    authDomain: "ploka-be736.firebaseapp.com",
    projectId: "ploka-be736",
    storageBucket: "ploka-be736.appspot.com",
    messagingSenderId: "834946972945",
    appId: "1:834946972945:web:554deb37314634d3f660b0",
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider)
    return result.user
  } catch (error) {
    throw error
  }
}
