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

    useEffect(() => {
        if (habit?.dates) {
            // Get dates for last year
            const today = new Date();
            const oneYearAgo = new Date();
            oneYearAgo.setFullYear(today.getFullYear() - 1);
            
            // Create array of all dates in the last year
            const dates = [];
            for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
                const dateStr = d.toISOString().split('T')[0];
                dates.push({
                    date: dateStr,
                    count: habit.dates.includes(dateStr) ? 1 : 0,
                    dayOfWeek: d.getDay() // 0-6, where 0 is Sunday
                });
            }
            setHeatmapData(dates.reverse()); // Reverse to get most recent first
        }
    }, [habit]);

    // Group dates into weeks, padding first week with empty days if needed
    const weeks = [];
    let currentWeek = [];
    
    // Add empty days at the start to align with correct day of week
    if (heatmapData.length > 0) {
        const firstDay = heatmapData[0].dayOfWeek;
        for (let i = 0; i < firstDay; i++) {
            currentWeek.push({ count: 0, dayOfWeek: i, date: '' });
        }
    }

    heatmapData.forEach((day) => {
        currentWeek.push(day);
        if (currentWeek.length === 7) {
            weeks.push(currentWeek);
            currentWeek = [];
        }
    });

    // Pad the last week with empty days if needed
    if (currentWeek.length > 0) {
        while (currentWeek.length < 7) {
            currentWeek.push({ count: 0, dayOfWeek: currentWeek.length, date: '' });
        }
        weeks.push(currentWeek);
    }

    return (
        <Dialog
        open={open}
        onClose={onClose}
        fullScreen
        sx={{
            '& .MuiDialog-paper': {
                width: '100%',
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
                display: 'flex', 
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%'
            }}>
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '2px', 
                    padding: 2,
                    maxWidth: 'fit-content'
                }}>
                    {weeks.map((week, weekIndex) => (
                        <Box key={weekIndex} sx={{ display: 'flex', gap: '2px' }}>
                            {week.map((day, dayIndex) => (
                                <Box
                                    key={`${weekIndex}-${dayIndex}`}
                                    sx={{
                                        width: '10px',
                                        height: '10px',
                                        backgroundColor: day.count ? '#196127' : '#ebedf0',
                                        borderRadius: '2px'
                                    }}
                                    title={day.date ? `${day.date}: ${day.count ? 'Completed' : 'Not completed'}` : ''}
                                />
                            ))}
                        </Box>
                    ))}
                </Box>
            </Box>
        </DialogContent>
        </Dialog>
    );
};

export default HabitDetailDialog;
