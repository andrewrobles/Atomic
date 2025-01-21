import ListItem from '@mui/material/ListItem';
import Heatmap from './Heatmap';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const HabitListItem = ({ item, handleOpenDetail }) => {
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
      <Box sx={{
        width: '100%',
        overflowX: 'auto'
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          minWidth: 'fit-content'
        }}>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 1,
              fontWeight: 'bold',
              fontSize: '1.1rem',
              color: '#2196f3',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              textAlign: 'left',
              paddingLeft: '8px'
            }}
          >
            {item.name}
          </Typography>
          <Box sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'row',
          }}>
            <Heatmap calendar={item?.calendar} />
          </Box>
        </Box>
      </Box>
    </ListItem>
  );
};

export default HabitListItem;
