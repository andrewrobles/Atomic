import { useEffect, useState } from 'react';
import './App.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const PROD_HOST = 'https://habits-api.netlify.app';
const LOCAL_HOST = 'http://localhost:8888';
const BASE_URL = window.location.hostname === 'localhost' ? LOCAL_HOST : PROD_HOST;

function App() {
  const [habits, setHabits] = useState([]); // State to store the fetched data
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    // Call to an API endpoint
    fetch(BASE_URL + '/habits')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json(); // Parse JSON response
      })
      .then((data) => {
        setHabits(data); // Update state with the fetched data
      })
      .catch((error) => {
        setError(error.message); // Update state with the error message
      });
  }, []); // Empty dependency array to ensure the effect runs only once on component mount

  return (
    <div>
      {error && <p className="error">Error: {error}</p>}
      <div style={{ padding: '16px' }}>
        <List>
          {habits.map((item, index) => (
            <ListItem
              key={index}
              sx={{
                '&:hover': {
                  backgroundColor: 'action.hover', // MUI theme hover color
                  cursor: 'pointer',
                },
              }}
            >
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
}

export default App;
