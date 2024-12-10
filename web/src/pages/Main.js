import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from '@mui/material';
import HabitList from '../components/HabitList';
import getHabits from '../api/index';

function Main() {
  const [habits, setHabits] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await getHabits();
        setHabits(response.data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          navigate('/auth');
        } else {
          setError(err.message);
        }
      }
    };

    fetchHabits();
  }, [navigate]);

  const handleSignOut = () => {
    // Clear authentication tokens or perform sign-out logic here
    navigate('/auth'); // Redirect to the authentication page
    localStorage.removeItem('userPassword');
  };

  return (
    <div>
      {/* Sign Out Button */}

      {/* Main Content */}
      {error && <p className="error">Error: {error}</p>}
      <Container maxWidth="sm">
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px' }}>
          <Button color="inherit" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
        <HabitList habits={habits} />
      </Container>
    </div>
  );
}

export default Main;