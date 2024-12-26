import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';

const HabitDetailDialog = ({ open, onClose, habit, onOpenConfirmDelete }) => {
    const [heatmapData, setHeatmapData] = useState([]);

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
                    {habit?.calendar?.map((month, monthIndex) => (
                    <Heatmap key={`${monthIndex}`} month={month} />
                    ))}
                </Box>
            </Box>
        </DialogContent>
        </Dialog>
    );
};

const Heatmap = ({ month }) => {
    return (
        <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '2px', 
            padding: 0.5,
            maxWidth: 'fit-content'
        }}>
            {month?.days?.map((dayArray, dayIndex) => (
                <Box key={dayIndex} sx={{ display: 'flex', flexDirection: 'row', gap: '2px' }}>
                    {dayArray.map((completed, index) => (
                        <Box 
                            key={`${dayIndex}-${index}`} 
                            sx={{ 
                                width: '10px', 
                                height: '10px', 
                                backgroundColor: completed ? '#196127' : '#ebedf0', 
                                borderRadius: '2px' 
                            }} 
                        />
                    ))}
                </Box>
            ))}
        </Box>
    )
}

export default HabitDetailDialog;
