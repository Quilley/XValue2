import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import HistoryCard from './HistoryCard';

const HistorySection: React.FC = () => {
  return (
    <Box sx={{ mt: 6 }}>
      <Typography 
        variant="h6" 
        sx={{ 
          mb: 3, 
          fontWeight: 600,
          position: 'relative',
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: '-8px',
            left: 0,
            width: '40px',
            height: '3px',
            backgroundColor: '#2563EB',
            borderRadius: '2px'
          }
        }}
      >
        History
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <HistoryCard title="Business Model" />
        </Grid>
        <Grid item xs={12} md={3}>
          <HistoryCard title="Business History" />
        </Grid>
        <Grid item xs={12} md={3}>
          <HistoryCard title="Merits" />
        </Grid>
        <Grid item xs={12} md={3}>
          <HistoryCard title="Demerits" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HistorySection;