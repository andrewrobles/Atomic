import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect } from 'react';

const HabitListItem = ({ item, onOpen, onMarkComplete, onMarkNotComplete }) => {
    const today = new Date().toISOString().split('T')[0];
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
        }}
      >
        <Checkbox 
          checked={isCompleted}
          onChange={handleCheckboxChange}
        />
        <ListItemText primary={item.name} />
        <IconButton
          edge="end"
          aria-label="more"
          onClick={() => onOpen(item)}
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </ListItem>
    );
};

export default HabitListItem;
