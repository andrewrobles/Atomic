import { useEffect, useState } from 'react';
import './App.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import getHabits from './api/index'

function App() {
  const [habits, setHabits] = useState([]); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    getHabits(setHabits, setError);
  }, []);

  return (
    <div>
      {error && <p className="error">Error: {error}</p>}
      <div style={{ padding: '16px' }}>
        <List>
          {habits.map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
}

export default App;
