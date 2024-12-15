import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const HabitList = (props) => {
  const [open, setOpen] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const handleOpen = (habit) => {
    setSelectedHabit(habit);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedHabit(null);
  };

  const handleOpenConfirmDelete = () => {
    setOpenConfirmDelete(true);
  };

  const handleDelete = () => {
    alert(`Deleted habit: ${selectedHabit.name}`);
    setOpenConfirmDelete(false)
    handleClose();
  };

  return (
    <>
      <List>
        {props.habits.map((item, index) => (
          <ListItem
            key={index}
            sx={{
              backgroundColor: 'white',
              color: 'black',
              marginBottom: '1px',
            }}
          >
            <ListItemText primary={item.name} />
            <IconButton
              edge="end"
              aria-label="more"
              onClick={() => handleOpen(item)}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Dialog
        open={open}
        onClose={handleClose}
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
              onClick={handleClose}
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
                onClick={handleOpenConfirmDelete}
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
      <Dialog
        open={openConfirmDelete}
        onClose={handleClose}
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
                onClick={() => {
                  setOpenConfirmDelete(false);
                  setOpen(false);
                }}
                sx={{ color: 'gray' }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Are you sure you want to delete "{selectedHabit?.name}"?</Typography>
            </Box>
        </DialogTitle>
        <DialogContent>
          {selectedHabit ? (
            <>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  onClick={handleDelete}
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
                  onClick={() => {
                    setOpenConfirmDelete(false);
                    setOpen(false);
                  }}
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
    </>
  );
};

export default HabitList;
