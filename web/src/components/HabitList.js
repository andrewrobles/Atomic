import { useState } from 'react';

import List from '@mui/material/List';

import HabitActionsDialog from './HabitActionsDialog';
import DeleteConfirmDialog from './DeleteConfirmDialog';
import HabitListItem from './HabitListItem';
import HabitDetailDialog from './HabitDetailDialog';
import api from '../api';

const HabitList = (props) => {
  const [openHabitActions, setOpenHabitActions] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [openHabitDetail, setOpenHabitDetail] = useState(false);

  const handleOpen = (habit) => {
    setSelectedHabit(habit);  
    setOpenHabitActions(true);
  };

  const handleClose = () => {
    setOpenHabitActions(false);
    setSelectedHabit(null);
  };

  const handleOpenDetail = (habit) => {
    setSelectedHabit(habit);
    setOpenHabitDetail(true);
  };

  const handleCloseDetail = () => {
    setOpenHabitDetail(false);
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
  };

  const handleMarkNotComplete = async (habitId, date) => {
    await api.updateHabitCompletion(habitId, date, false);
  };

  return (
    <>
      <List>
        {props.habits.map((item, index) => (
          <HabitListItem 
            key={index}
            item={item}
            onOpen={handleOpen}
            handleOpenDetail={handleOpenDetail}
            onMarkComplete={handleMarkComplete}
            onMarkNotComplete={handleMarkNotComplete}
          />
        ))}
      </List>

      <HabitDetailDialog
        open={openHabitDetail}
        onClose={handleCloseDetail}
        habit={selectedHabit}
        onOpenActions={handleOpen}
      />
      
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
