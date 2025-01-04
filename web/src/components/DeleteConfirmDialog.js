import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const DeleteConfirmDialog = ({ open, onClose, onDelete, habitName, selectedHabit }) => {
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
                justifyContent: 'flex-end'
              }}
            >
              <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{ color: 'gray' }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                Are you sure you want to delete "{habitName}"?
              </Typography>
            </Box>
        </DialogTitle>
        <DialogContent>
          {selectedHabit ? (
            <>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  onClick={onDelete}
                  variant="contained"
                  sx={{
                    backgroundColor: 'red',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#cc0000',
                    }
                  }}
                >
                  Yes, delete permanently
                </Button>
                <Button
                  onClick={onClose}
                  variant="contained"
                  sx={{
                    backgroundColor: 'white',
                    color: 'black',
                    '&:hover': {
                      backgroundColor: '#f0f0f0',
                    }
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </>
          ) : (
            <Typography variant="body2">Loading...</Typography>
          )}
        </DialogContent>
      </Dialog>
    );
};
  
export default DeleteConfirmDialog;