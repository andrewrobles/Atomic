import { useState } from 'react';

import List from '@mui/material/List';

import HabitActionsDialog from './HabitActionsDialog';
import DeleteConfirmDialog from './DeleteConfirmDialog';
import HabitListItem from './HabitListItem';
import api from '../api';

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

  const handleDelete = async () => {
    await api.deleteHabit(selectedHabit._id);
    await props.onDelete();
    setOpenConfirmDelete(false)
    handleClose();
  };

  return (
    <>
      <List>
        {props.habits.map((item, index) => (
          <HabitListItem 
            key={index}
            item={item}
            onOpen={handleOpen}
          />
        ))}
      </List>
      
      <HabitActionsDialog 
        open={open}
        onClose={handleClose}
        selectedHabit={selectedHabit}
        onOpenConfirmDelete={handleOpenConfirmDelete}
      />
      <DeleteConfirmDialog
        open={openConfirmDelete}
        onClose={() => {
          setOpenConfirmDelete(false);
          setOpen(false);
        }}
        onDelete={handleDelete}
        habitName={selectedHabit?.name}
        selectedHabit={selectedHabit}
      />
    </>
  );
};


export default HabitList;
