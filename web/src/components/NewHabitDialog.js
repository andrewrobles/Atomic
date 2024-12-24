import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
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
        fullScreen
        open={open}
        onClose={onClose}
        sx={{
            '& .MuiDialog-paper': {
            width: '550px', // Set the width of the dialog
            maxWidth: 'none', // Disable default max width restriction
            },
        }}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={onClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6">
                        New habit
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleSubmit}>
                        Save
                    </Button>
                </Toolbar>
            </AppBar>
            <DialogContent>
                <TextField
                    autoFocus
                    fullWidth
                    label="Name your habit"
                    variant="standard"
                    value={habitName}
                    onChange={(e) => setHabitName(e.target.value)}
                    sx={{ mt: 2 }}
                />
            </DialogContent>
        </Dialog>
    );
};

export default NewHabitDialog;
