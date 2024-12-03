import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


const HabitList = (props) => {
  return <List>
    {props.habits.map((item, index) => (
      <ListItem key={index}>
        <ListItemText primary={item.name} />
      </ListItem>
    ))}
  </List>
}

export default HabitList;
