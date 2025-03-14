import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, FormControl, InputLabel, Select, MenuItem, TextField, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { RotateCcw } from 'lucide-react';

interface InfoCardProps {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  accentColor?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, icon, children, accentColor = '#2563EB' }) => {
  const [dropdown1, setDropdown1] = useState('Option A');
  const [dropdown2, setDropdown2] = useState('Option X');
  const [textField1, setTextField1] = useState('Default Value 1');
  const [textField2, setTextField2] = useState('Default Value 2');
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);

  // Default values to reset to
  const defaultValues = {
    dropdown1: 'Option A',
    dropdown2: 'Option X',
    textField1: 'Default Value 1',
    textField2: 'Default Value 2'
  };

  const handleResetClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsResetDialogOpen(true);
  };

  const handleConfirmReset = (confirm: boolean) => {
    setIsResetDialogOpen(false);
    if (confirm) {
      setDropdown1(defaultValues.dropdown1);
      setDropdown2(defaultValues.dropdown2);
      setTextField1(defaultValues.textField1);
      setTextField2(defaultValues.textField2);
    }
  };

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          height: '100%',
          borderColor: '#bdbdbd',
          position: 'relative',
          backgroundColor: '#fff',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 16px rgba(189,189,189,0.2)',
            '&::after': {
              opacity: 1,
            },
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(145deg, rgba(189,189,189,0.1) 0%, rgba(189,189,189,0.05) 100%)',
            borderRadius: '12px',
            opacity: 0,
            transition: 'opacity 0.3s ease',
          },
        }}
      >
        <CardContent sx={{ position: 'relative', zIndex: 1, pb: 4 }}>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              color: '#424242',
              fontWeight: 600,
              fontSize: '1.1rem',
              borderBottom: '2px solid #bdbdbd',
              pb: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: '10px',
                backgroundColor: `${accentColor}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 0 8px ${accentColor}30`,
              }}
            >
              {React.cloneElement(icon as React.ReactElement, {
                size: 16,
                color: accentColor,
                strokeWidth: 2,
              })}
            </Box>
            {title}
          </Typography>

          <Box sx={{ color: '#6B7280' }}>
            <FormControl fullWidth margin="dense" size="small">
              <InputLabel>Dropdown 1</InputLabel>
              <Select
                value={dropdown1}
                label="Dropdown 1"
                onChange={(e) => setDropdown1(e.target.value as string)}
              >
                <MenuItem value="Option A">Option A</MenuItem>
                <MenuItem value="Option B">Option B</MenuItem>
                <MenuItem value="Option C">Option C</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              margin="dense"
              size="small"
              label="Text Field 1"
              value={textField1}
              onChange={(e) => setTextField1(e.target.value)}
            />

            <FormControl fullWidth margin="dense" size="small">
              <InputLabel>Dropdown 2</InputLabel>
              <Select
                value={dropdown2}
                label="Dropdown 2"
                onChange={(e) => setDropdown2(e.target.value as string)}
              >
                <MenuItem value="Option X">Option X</MenuItem>
                <MenuItem value="Option Y">Option Y</MenuItem>
                <MenuItem value="Option Z">Option Z</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              margin="dense"
              size="small"
              label="Text Field 2"
              value={textField2}
              onChange={(e) => setTextField2(e.target.value)}
            />
          </Box>
        </CardContent>
        
        {/* Reset button */}
        <IconButton
          onClick={handleResetClick}
          sx={{
            position: 'absolute',
            bottom: '8px',
            right: '8px',
            color: '#757575',
            '&:hover': {
              backgroundColor: 'rgba(189,189,189,0.2)',
              color: accentColor
            },
          }}
        >
          <RotateCcw size={16} />
        </IconButton>
      </Card>

      {/* Reset Confirmation Dialog */}
      <Dialog
        open={isResetDialogOpen}
        onClose={() => setIsResetDialogOpen(false)}
      >
        <DialogTitle>Reset to Default?</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to reset all values to their defaults?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleConfirmReset(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleConfirmReset(true)} color="primary" variant="contained">
            Yes, Reset
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default InfoCard;