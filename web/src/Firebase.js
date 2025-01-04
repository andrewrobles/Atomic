// Auth service
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBJbonEVB6grM13ZRYCy8N_xH8ENv1e8G0",
    authDomain: "habits-e1ad9.firebaseapp.com",
    projectId: "habits-e1ad9",
    storageBucket: "habits-e1ad9.firebasestorage.app",
    messagingSenderId: "91926125884",
    appId: "1:91926125884:web:d4829ade798a40f5125239",
    measurementId: "G-W0RNCEGKR9"
}

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider()

const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

}


const Firebase = () => {
  return (
    <>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </>
  )
}

export default Firebase 