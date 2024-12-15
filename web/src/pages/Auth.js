import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Container,
} from '@mui/material';
import api from '../api'; // Import the getHabits function

const Auth = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // TODO: Use data from this API call in index page
        const response = await api.getHabits();
        if (response.status === 200) {
          navigate('/'); // Navigate to the main page if already authenticated
        }
      } catch (err) {
        if (err.response && err.response.status !== 401) {
          setError('Unexpected server error.');
        }
        // If 401, remain on the login page
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogin = async () => {
    try {
      // Store the password in local storage
      localStorage.setItem('userPassword', password);
      console.log('Password stored in local storage:', password);

      // Call getHabits to confirm authentication
      const response = await api.getHabits();
      if (response.status === 200) {
        navigate('/'); // Navigate to the main page on success
      }
    } catch (err) {
      setError('Invalid password or server error.');
      console.error('Error during authentication:', err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        padding={2}
        sx={{backgroundColor: 'white'}} 
      >
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default Auth;