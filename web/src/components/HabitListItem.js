import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect } from 'react';

const HabitListItem = ({ item, onOpen, handleOpenDetail, onMarkComplete, onMarkNotComplete }) => {
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
      >
        <Checkbox 
          checked={isCompleted}
          onChange={handleCheckboxChange}
          onClick={(e) => e.stopPropagation()} // Prevent ListItem click when clicking checkbox
        />
        <ListItemText primary={item.name} />
        <IconButton
          edge="end"
          aria-label="more"
          onClick={(e) => {
            e.stopPropagation(); // Prevent ListItem click when clicking menu
            onOpen(item);
          }}
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </ListItem>
    );
};

export default HabitListItem;
