import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const HabitList = (props) => {
  return (
    <List>
      {props.habits.map((item, index) => (
        <ListItem 
          key={index} 
          sx={{
            backgroundColor: 'white',  // Set background to white
            color: 'black',            // Ensure text is black for contrast
            marginBottom: '1px',       // Optional: add margin between items
          }}
        >
          <ListItemText primary={item.name} />
        </ListItem>
      ))}
    </List>
  );
};

export default HabitList;
