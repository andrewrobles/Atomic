import React from 'react';
import { Box, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

// TODO: add this to a route that can be accesssed from any page via redirect and also include a retry function
const Error = ({ title, message }) => {
  return (
    <Box
      display="flex" 
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      pt={4}
      gap={2}
    >
      <ErrorOutlineIcon sx={{ fontSize: 64, color: 'error.main' }} />
      <Typography variant="h5" align="center">
        {message || 'Error'}
      </Typography>
      <Typography variant="body1" align="center" color="text.secondary">
        {title || 'An error occurred. Please try again.'}
      </Typography>
    </Box>
  );
};

export default Error;
