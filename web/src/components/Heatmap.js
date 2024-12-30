import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Heatmap = ({ calendar }) => {
    const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    
    return (
        <>
            {calendar?.map((month, monthIndex) => (
                <Box 
                    key={`${monthIndex}`}
                    sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '2px', 
                        padding: 0.5,
                        maxWidth: 'fit-content'
                    }}
                >
                    <Typography sx={{ 
                        fontSize: '11px', 
                        color: 'text.primary',
                        marginLeft: monthIndex === 0 ? '20px' : 0 // Adjusted margin to align with boxes
                    }}>
                        {month?.month}
                    </Typography>
                    {month?.days?.map((dayArray, dayIndex) => (
                        <Box key={dayIndex} sx={{ display: 'flex', flexDirection: 'row', gap: '2px', alignItems: 'center' }}>
                            {monthIndex === 0 && (
                                <Typography sx={{ 
                                    fontSize: '10px', 
                                    color: 'text.primary', 
                                    width: '14px', 
                                    marginRight: '6px',
                                    lineHeight: 1,
                                    height: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    {weekdays[dayIndex]}
                                </Typography>
                            )}
                            {dayArray.map((completed, index) => (
                                <Box 
                                    key={`${dayIndex}-${index}`} 
                                    sx={{ 
                                        width: '12px', 
                                        height: '12px', 
                                        backgroundColor: completed === null ? 'transparent' : completed ? '#196127' : '#ebedf0',
                                        borderRadius: '2px' 
                                    }} 
                                />
                            ))}
                        </Box>
                    ))}
                </Box>
            ))}
        </>
    )
}

export default Heatmap;