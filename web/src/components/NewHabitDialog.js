import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import api from '../api';
import { useState } from 'react';

const NewHabitDialog = ({ open, onClose, onSave }) => {
    const [habitName, setHabitName] = useState('');

    const handleSubmit = async () => {
        try {
            await api.addHabit(habitName);
            onSave();
            onClose();
            setHabitName('');
        } catch (err) {
            console.error('Error creating habit:', err);
        }
    };

    return (
        <Dialog
        open={open}
        onClose={onClose}
        sx={{
            '& .MuiDialog-paper': {
            width: '550px', // Set the width of the dialog
            maxWidth: 'none', // Disable default max width restriction
            },
        }}
        >
        <DialogTitle>
            <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
            >
            <Typography variant="h6">New habit</Typography>
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{ color: 'gray' }}
            >
                <CloseIcon />
            </IconButton>
            </Box>
        </DialogTitle>
        <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    fullWidth
                    label="Habit name"
                    variant="outlined"
                    value={habitName}
                    onChange={(e) => setHabitName(e.target.value)}
                />
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{
                        backgroundColor: 'black',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#333'
                        }
                    }}
                >
                    Define your habit
                </Button>
            </Box>
        </DialogContent>
        </Dialog>
);
};

export default NewHabitDialog;
