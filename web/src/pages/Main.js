import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, CircularProgress, Typography } from '@mui/material';

import HabitList from '../components/HabitList';
import NewHabitDialog from '../components/NewHabitDialog';
import NewHabitButton from '../components/NewHabitButton';
import Error from '../components/Error';
import api from '../api';

function Main() {
  const [habits, setHabits] = useState([]);
  const [error, setError] = useState(null);
  const [openNewHabit, setOpenNewHabit] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await api.getHabits();
        setHabits(response.data);
        setError(null);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          navigate('/auth');
        } else {
          setError({
            title: 'Failed to load habits',
            message: err.message
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHabits();
  }, [navigate]);
  
  const refreshHabits = async () => {
    setLoading(true);
    try {
      const response = await api.getHabits();
      setHabits(response.data);
      setError(null);
    } catch (err) {
      setError({
        title: 'Failed to refresh habits',
        message: err.message
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    // Clear authentication tokens or perform sign-out logic here
    navigate('/auth'); // Redirect to the authentication page
    localStorage.removeItem('userPassword');
  };

  if (error) {
    return <Error title={error.title} message={error.message} />;
  }

  return (
    <div>
      <Container maxWidth="sm">
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px' }}>
          <Button color="inherit" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <CircularProgress />
          </div>
        ) : (
          <>
            {habits.length === 0 ? (
              <Typography 
                variant="body1" 
                align="center" 
                sx={{ mt: 4, color: 'text.secondary' }}
              >
                No habits have been added yet. Click the + button below to add your first habit!
              </Typography>
            ) : (
              <HabitList habits={habits} onDelete={refreshHabits} />
            )}
          </>
        )}
        <NewHabitButton onClick={() => setOpenNewHabit(true)}/>
       
        <NewHabitDialog
          open={openNewHabit}
          onClose={() => setOpenNewHabit(false)}
          onSave={refreshHabits}
        />
      </Container>
    </div>
  );
}

export default Main;