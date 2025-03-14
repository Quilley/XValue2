import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, IconButton, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Edit, Delete, Expand, Mic, Wand2, Speaker } from 'lucide-react';

interface HistoryCardProps {
  title: string;
}

const HistoryCard: React.FC<HistoryCardProps> = ({ title }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultricies diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.');
  const [tone, setTone] = useState<'positive' | 'negative' | 'neutral'>('neutral');

  const handleExpandClick = () => {
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setIsEditing(false);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newText = event.target.value;
    setText(newText);
    // Simple tone analysis based on text content
    if (newText.toLowerCase().includes('good') || newText.toLowerCase().includes('benefit') || newText.toLowerCase().includes('positive')) {
      setTone('positive');
    } else if (newText.toLowerCase().includes('bad') || newText.toLowerCase().includes('issue') || newText.toLowerCase().includes('negative')) {
      setTone('negative');
    } else {
      setTone('neutral');
    }
  };

  const getToneColor = () => {
    switch (tone) {
      case 'positive':
        return '#10B981'; // Green
      case 'negative':
        return '#EF4444'; // Red
      default:
        return '#6B7280'; // Gray
    }
  };

  const getToneLabel = () => {
    switch (tone) {
      case 'positive':
        return 'Positive';
      case 'negative':
        return 'Negative';
      default:
        return 'Neutral';
    }
  };

  return (
    <>
      <Card 
        variant="outlined" 
        sx={{ 
          position: 'relative', 
          height: '280px',
          borderColor: '#bdbdbd',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 16px rgba(189,189,189,0.2)',
          },
        }}
      >
        <CardContent>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 2, 
              color: '#424242',
              fontWeight: 600,
              fontSize: '1.1rem',
              borderBottom: '2px solid #bdbdbd',
              pb: 1
            }}
          >
            {title}
          </Typography>
          <TextField
            multiline
            fullWidth
            rows={4}
            value={text}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
        </CardContent>

        {/* Floating Buttons */}
        <Box sx={{ position: 'absolute', top: '8px', right: '8px', display: 'flex' }}>
          <IconButton color="default">
            <Wand2 size={16} />
          </IconButton>
          <IconButton color="default">
            <Mic size={16} />
          </IconButton>
        </Box>
        
        <Box sx={{ position: 'absolute', bottom: '8px', left: '8px' }}>
          <IconButton color="error">
            <Delete size={16} />
          </IconButton>
        </Box>
        
        <Box sx={{ position: 'absolute', bottom: '8px', right: '8px', display: 'flex', alignItems: 'center' }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mr: 2,
            px: 1,
            py: 0.5,
            borderRadius: '12px',
            backgroundColor: `${getToneColor()}10`,
            border: `1px solid ${getToneColor()}30`
          }}>
            <IconButton 
              size="small"
              sx={{ color: getToneColor(), mr: 0.5 }}
            >
              <Speaker size={14} />
            </IconButton>
            <Typography variant="caption" sx={{ color: getToneColor(), fontWeight: 500 }}>
              {getToneLabel()}
            </Typography>
          </Box>
          
          <IconButton color="secondary" onClick={handleEditClick}>
            <Edit size={16} />
          </IconButton>
          <IconButton color="primary" onClick={handleExpandClick}>
            <Expand size={16} />
          </IconButton>
        </Box>
      </Card>

      {/* Dialog */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="md">
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <TextField
            multiline
            fullWidth
            rows={10}
            value={text}
            onChange={handleTextChange}
            InputProps={{
              readOnly: !isEditing,
            }}
            variant="outlined"
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
          {isEditing && <Button onClick={handleCloseDialog} color="primary">Save</Button>}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default HistoryCard;