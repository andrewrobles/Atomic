import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

// TODO: Make a generic dialogue 
const HabitActionsDialog = ({ open, onClose, onOpenConfirmDelete }) => {
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
            <Typography variant="h6">Habit</Typography>
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{ color: 'gray' }}
            >
                <CloseIcon />
            </IconButton>
            </Box>
        </DialogTitle>
        </Dialog>
);
};

export default HabitActionsDialog;
