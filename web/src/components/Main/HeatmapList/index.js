import List from '@mui/material/List';
import HeatmapListItem from './HeatmapListItem';

const HabitList = (props) => {

  return (
    <>
      <List>
        {props.habits.map((item, index) => (
          <HeatmapListItem
            key={index}
            item={item}
          />
        ))}
      </List>
    </>
  );
};

export default HabitList;
