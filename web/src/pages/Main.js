import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import the useNavigate hook
import HabitList from '../components/HabitList';
import getHabits from '../api/index';

function Main() {
  const [habits, setHabits] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // Initialize the navigate function

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await getHabits();
        setHabits(response.data); 
      } catch (err) {
        // Check for a 401 status code and redirect to /auth if encountered
        if (err.response && err.response.status === 401) {
          navigate('/auth');  // Redirect to /auth page
        } else {
          setError(err.message);
        }
      }
    };

    fetchHabits(); 
  }, [navigate]);  // Make sure to include navigate as a dependency

  return (
    <div>
      {error && <p className="error">Error: {error}</p>}
      <div style={{ padding: '16px' }}>
        <HabitList habits={habits} />
      </div>
    </div>
  );
}

export default Main;
