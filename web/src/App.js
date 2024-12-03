import { useEffect, useState } from 'react';
import './App.css';

import HabitList from './components/HabitList'
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
        <HabitList habits={habits} />
      </div>
    </div>
  );
}

export default App;
