import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

const NewHabitButton = props => {
    return <Fab
        color="primary"
        aria-label="add"
        onClick={props.onClick}
        sx={{
            position: 'fixed',
            bottom: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'white',
            color: 'primary.main',
            '&:hover': {
                backgroundColor: '#f5f5f5'
            }
        }}
    >
        <AddIcon />
    </Fab>
}

export default NewHabitButton