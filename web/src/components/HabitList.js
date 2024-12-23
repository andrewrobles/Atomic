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

  const handleMarkComplete = async (habitId, date) => {
    await api.updateHabitCompletion(habitId, date, true);
    await props.onDelete(); // Refresh habits list
  };

  const handleMarkNotComplete = async (habitId, date) => {
    await api.updateHabitCompletion(habitId, date, false);
    await props.onDelete(); // Refresh habits list
  };

  return (
    <>
      <List>
        {props.habits.map((item, index) => (
          <HabitListItem 
            key={index}
            item={item}
            onOpen={handleOpen}
            onMarkComplete={handleMarkComplete}
            onMarkNotComplete={handleMarkNotComplete}
          />
        ))}
      </List>
      
      <HabitActionsDialog 
        open={openHabitActions}
        onClose={handleClose}
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
