import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyBJbonEVB6grM13ZRYCy8N_xH8ENv1e8G0",
  authDomain: "habits-e1ad9.firebaseapp.com",
  projectId: "habits-e1ad9",
  storageBucket: "habits-e1ad9.firebasestorage.app",
  messagingSenderId: "91926125884",
  appId: "1:91926125884:web:d4829ade798a40f5125239",
  measurementId: "G-W0RNCEGKR9"
};

const app = initializeApp(firebaseConfig)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
