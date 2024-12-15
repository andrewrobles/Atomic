import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
const HabitListItem = ({ item, onOpen }) => {
    return (
      <ListItem
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
          onClick={() => onOpen(item)}
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </ListItem>
    );
};

export default HabitListItem;

