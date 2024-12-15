import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const HabitActionsDialog = ({ open, onClose, selectedHabit, onOpenConfirmDelete }) => {
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
            <Typography variant="h6">Habit actions</Typography>
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
            {selectedHabit ? (
            <>
                <Button
                variant="text"
                startIcon={<DeleteIcon />}
                onClick={onOpenConfirmDelete}
                sx={{
                    color: 'red', // Red text for delete button
                }}
                >
                Delete
                </Button>
            </>
            ) : (
            <Typography variant="body2">Loading...</Typography>
            )}
        </DialogContent>
        </Dialog>
);
};

export default HabitActionsDialog;
