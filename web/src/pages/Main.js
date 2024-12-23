import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Fab, CircularProgress, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import HabitList from '../components/HabitList';
import NewHabitDialog from '../components/NewHabitDialog';
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
      } catch (err) {
        if (err.response && err.response.status === 401) {
          navigate('/auth');
        } else {
          setError(err.message);
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
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    // Clear authentication tokens or perform sign-out logic here
    navigate('/auth'); // Redirect to the authentication page
    localStorage.removeItem('userPassword');
  };

  const handleOpenNewHabit = () => {
    setOpenNewHabit(true);
  };

  const handleCloseNewHabit = () => {
    setOpenNewHabit(false);
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
        <Fab 
          color="primary" 
          aria-label="add"
          onClick={handleOpenNewHabit}
          sx={{
            position: 'fixed',
            bottom: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'white',
            color: 'primary.main',
            '&:hover': {
              backgroundColor: '#f5f5f5'
            }
          }}
        >
          <AddIcon />
        </Fab>
        <NewHabitDialog
          open={openNewHabit}
          onClose={handleCloseNewHabit}
          onSave={refreshHabits}
        />
      </Container>
    </div>
  );
}

export default Main;