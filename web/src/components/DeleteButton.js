
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

const DeleteButton = ({ onOpenConfirmDelete }) => {
    return (
        <Button
            variant="text"
            startIcon={<DeleteIcon />}
            onClick={onOpenConfirmDelete}
            sx={{
                color: 'red', 
            }}
        >
            Delete habit
        </Button>
    )
}

export default DeleteButton;
