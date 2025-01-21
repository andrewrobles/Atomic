import { useState } from 'react';

import List from '@mui/material/List';

import HabitActionsDialog from './HabitActionsDialog';
import DeleteConfirmDialog from './DeleteConfirmDialog';
import HabitListItem from './HabitListItem';
import api from '../../../api';

const HabitList = (props) => {
  const [openHabitActions, setOpenHabitActions] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  const handleOpenHabitActions = (habit) => {
    setSelectedHabit(habit);
    setOpenHabitActions(true);
  };

  const handleCloseHabitActions = () => {
    setOpenHabitActions(false);
    setSelectedHabit(null);
  };

  const handleOpenDetail = (habit) => {
    setSelectedHabit(habit);
  };


  const handleOpenConfirmDelete = () => {
    setOpenConfirmDelete(true);
  };

  const handleDelete = async () => {
    await api.deleteHabit(selectedHabit._id);
    await props.onDelete();
    setOpenConfirmDelete(false)
    handleCloseHabitActions();
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
            onOpen={handleOpenHabitActions}
            handleOpenDetail={handleOpenDetail}
            onMarkComplete={handleMarkComplete}
            onMarkNotComplete={handleMarkNotComplete}
          />
        ))}
      </List>

      <HabitActionsDialog
        open={openHabitActions}
        onClose={handleCloseHabitActions}
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
      />
    </>
  );
};

export default HabitList;
