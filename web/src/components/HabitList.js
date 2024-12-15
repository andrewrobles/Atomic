import { useState } from 'react';

import List from '@mui/material/List';

import HabitActionsDialog from './HabitActionsDialog';
import DeleteConfirmDialog from './DeleteConfirmDialog';
import HabitListItem from './HabitListItem';
import api from '../api';

const HabitList = (props) => {
  const [openHabitActions, setOpenHabitActions] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const handleOpen = (habit) => {
    setSelectedHabit(habit);  
    setOpenHabitActions(true);
  };

  const handleClose = () => {
    setOpenHabitActions(false);
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
        open={openHabitActions}
        onClose={handleClose}
        selectedHabit={selectedHabit}
        onOpenConfirmDelete={handleOpenConfirmDelete}
      />
      <DeleteConfirmDialog
        open={openConfirmDelete}
        onClose={() => {
          setOpenConfirmDelete(false);
          setOpenHabitActions(false);
        }}
        onDelete={handleDelete}
        habitName={selectedHabit?.name}
        selectedHabit={selectedHabit}
      />
    </>
  );
};


export default HabitList;
