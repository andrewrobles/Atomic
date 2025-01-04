import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect } from 'react';

const HabitListItem = ({ item, onOpen, handleOpenDetail, onMarkComplete, onMarkNotComplete }) => {
    // TODO: Move this function to utils
    const today = new Date().toLocaleDateString('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).replace(/\//g, '-');

    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        setIsCompleted(item.dates && item.dates.includes(today));
    }, [item.dates, today]);

    const handleCheckboxChange = (event) => {
        const checked = event.target.checked;
        setIsCompleted(checked);
        if (checked) {
            onMarkComplete(item._id, today);
        } else {
            onMarkNotComplete(item._id, today);
        }
    };

    return (
      <ListItem
        sx={{
          backgroundColor: 'white', 
          color: 'black',
          marginBottom: '1px',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: '#fafafa', // Very slightly darker shade when hovered
          }
        }}
        onClick={() => handleOpenDetail(item)}
      >
        <Checkbox 
          checked={isCompleted}
          onChange={handleCheckboxChange}
          onClick={(e) => e.stopPropagation()} // Prevent ListItem click when clicking checkbox
        />
        <ListItemText primary={item.name} />
      </ListItem>
    );
};

export default HabitListItem;
