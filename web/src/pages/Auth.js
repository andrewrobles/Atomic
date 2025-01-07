import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
} from '@mui/material'

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

const Auth = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (localStorage.getItem('token')) {
            navigate('/')
        }
      } catch (err) {
        if (err.response && err.response.status !== 401) {
          setError('Unexpected server error.');
        }
      }
    };

    checkAuth();
  }, [navigate]);

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        localStorage.setItem('token', token)
        console.log(`token: ${token}`)

        // The signed-in user info.
        const user = result.user;
        console.log(`user: ${JSON.stringify(user)}`)

        if (user) {
          navigate('/')
        }
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        setError(errorMessage)
      });
  }

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        padding={2}
        sx={{ backgroundColor: 'white' }}
      >
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button
          variant="contained"
          color="primary"
          onClick={signInWithGoogle}
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Sign in with Google
        </Button>
      </Box>
    </Container>
  );
};

export default Auth;