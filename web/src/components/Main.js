import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, CircularProgress, Typography } from '@mui/material';

import HabitList from '../components/HabitList';
import NewHabitDialog from '../components/NewHabitDialog';
import NewHabitButton from '../components/NewHabitButton';
import SignOutButton from '../components/SignOutButton';
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
        const response = await api.getHabits()
        setHabits(response.data)
        response.data.forEach(habit => {
          const habitCopy = {...habit}
          delete habitCopy.calendar
          console.log(`habit: ${JSON.stringify(habitCopy)}`)
        }) 
        setError(null)
      } catch (err) {
        if (err.response) {
          localStorage.removeItem('idToken')
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
    if (localStorage.getItem('idToken') === null) {
      navigate('/auth')
    } else {
      fetchHabits();
    }
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

  if (error) {
    return <Error title={error.title} message={error.message} />;
  }

  return (
    <div>
      <Container maxWidth="sm">
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px' }}>
          <SignOutButton/>
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
                No tasks have been added yet. Click the + button below to add your first task!
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