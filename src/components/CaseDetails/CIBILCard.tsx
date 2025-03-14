import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface CIBILCardProps {
  customerName: string;
  cibilScore: string | number;
  abb: string | number;
  overdue: string | number;
  runningLoans: string | number;
  isDarkMode: boolean;
}

const getCibilScoreColor = (score: string | number): string => {
  const numScore = typeof score === 'string' ? parseInt(score, 10) : score;
  
  if (isNaN(numScore)) return '#9CA3AF'; // Gray for NA
  if (numScore >= 750) return '#10B981'; // Green for good score
  if (numScore >= 650) return '#F59E0B'; // Amber for medium score
  return '#EF4444'; // Red for poor score
};

const CIBILCard: React.FC<CIBILCardProps> = ({ 
  customerName, 
  cibilScore, 
  abb, 
  overdue, 
  runningLoans,
  isDarkMode
}) => {
  const scoreColor = getCibilScoreColor(cibilScore);
  
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        height: '100%',
        backgroundColor: isDarkMode ? '#1e1e1e' : '#fff',
        borderColor: isDarkMode ? '#333' : '#E5E7EB',
      }}
    >
      <CardContent>
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 2, 
            color: isDarkMode ? '#fff' : '#111827',
            fontWeight: 600,
            fontSize: '1.1rem'
          }}
        >
          {customerName || "Unnamed Customer"}
        </Typography>
        
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <Box sx={{ 
            width: 12, 
            height: 12, 
            borderRadius: '50%', 
            backgroundColor: scoreColor,
            mr: 1.5,
            display: 'inline-block'
          }} />
          <Typography 
            variant="body2" 
            sx={{ color: isDarkMode ? '#e0e0e0' : '#6B7280', mr: 1 }}
          >
            CIBIL Score:
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              fontWeight: 600, 
              color: isDarkMode ? '#fff' : '#111827'
            }}
          >
            {cibilScore || 'NA'}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography 
            variant="body2" 
            sx={{ color: isDarkMode ? '#e0e0e0' : '#6B7280' }}
          >
            Average Bank Balance:
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              fontWeight: 600, 
              color: isDarkMode ? '#fff' : '#111827'
            }}
          >
            ₹{abb || '0'}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography 
            variant="body2" 
            sx={{ color: isDarkMode ? '#e0e0e0' : '#6B7280' }}
          >
            Overdue:
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              fontWeight: 600, 
              color: isDarkMode ? '#fff' : '#111827'
            }}
          >
            ₹{overdue || '0'}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography 
            variant="body2" 
            sx={{ color: isDarkMode ? '#e0e0e0' : '#6B7280' }}
          >
            Running Loans:
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              fontWeight: 600, 
              color: isDarkMode ? '#fff' : '#111827'
            }}
          >
            {runningLoans || '0'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CIBILCard;