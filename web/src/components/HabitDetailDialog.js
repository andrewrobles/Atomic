import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Heatmap from './Heatmap';
import DeleteButton from './DeleteButton';

const HabitDetailDialog = ({ open, onClose, habit, onOpenConfirmDelete }) => {
    return (
        <Dialog
        open={open}
        onClose={onClose}
        fullScreen
        sx={{
            '& .MuiDialog-paper': {
                width: '550px',
                height: '100%',
                margin: 0,
                maxWidth: 'none',
                maxHeight: 'none'
            },
        }}
        >
        <DialogTitle>
            <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
            >
            <Typography variant="h6">{habit?.name}</Typography>
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{ color: 'gray' }}
            >
                <CloseIcon />
            </IconButton>
            </Box>
        </DialogTitle>
        <DialogContent>
            <Box sx={{
                width: '100%',
                overflowX: 'auto'
            }}>
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                    height: '100%',
                    minWidth: 'fit-content'
                }}>
                    <Heatmap calendar={habit?.calendar} />
                </Box>
            </Box>
            <Box sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                padding: 2,
                display: 'flex',
                justifyContent: 'center'
            }}>
                <DeleteButton onOpenConfirmDelete={onOpenConfirmDelete}/>
            </Box>
        </DialogContent>
        </Dialog>
    );
};



export default HabitDetailDialog;
