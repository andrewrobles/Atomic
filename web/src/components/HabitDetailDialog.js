import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// TODO: Make a generic dialogue 
const HabitActionsDialog = ({ open, onClose, onOpenConfirmDelete }) => {
    return (
        <Dialog
        open={open}
        onClose={onClose}
        fullScreen
        sx={{
            '& .MuiDialog-paper': {
                width: '100%',
                height: '100%',
                margin: 0,
                maxWidth: 'none',
                maxHeight: 'none'
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
