import React, { useState } from 'react';
import { 
  Grid, Typography, Box, FormControl, Select, MenuItem, 
  TextField, IconButton, Tooltip, Dialog, DialogTitle, 
  DialogContent, DialogContentText, DialogActions, Button 
} from '@mui/material';
import { Network, Search, FileText, Home, AlertOctagon, RotateCcw, Database } from 'lucide-react';
import FileUploadCard from '../FileUploadCard';

interface InfoCardProps {
  title: string;
  icon: React.ReactNode;
  accentColor?: string;
  children?: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, icon, accentColor = '#2563EB', children }) => {
  // State for tracking hover effects
  const [isResetHovered, setIsResetHovered] = useState(false);
  const [isDatabaseHovered, setIsDatabaseHovered] = useState(false);
  
  // Add state for dialog
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [isDatabaseDialogOpen, setIsDatabaseDialogOpen] = useState(false);
  
  // Add handlers for toggle clicks
  const handleResetClick = () => {
    setIsResetDialogOpen(true);
  };
  
  const handleDatabaseClick = () => {
    setIsDatabaseDialogOpen(true);
  };
  
  // Handle reset confirmation
  const handleResetConfirm = () => {
    console.log('Resetting data for', title);
    // Implement your reset logic here
    setIsResetDialogOpen(false);
  };
  
  // Handle database fetch confirmation
  const handleDatabaseConfirm = () => {
    console.log('Fetching database records for', title);
    // Implement your database fetch logic here
    setIsDatabaseDialogOpen(false);
  };
  
  return (
    <>
      <Box
        sx={{
          height: '100%',
          borderRadius: '12px',
          border: '1px solid #bdbdbd',
          position: 'relative',
          backgroundColor: '#fff',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease',
          padding: '1.25rem',
          cursor: 'pointer',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 16px rgba(189,189,189,0.2)',
          },
          background: `linear-gradient(145deg, ${accentColor}05 0%, ${accentColor}02 100%)`,
        }}
      >
        {/* Floating toggle buttons */}
        <Box sx={{ 
          position: 'absolute', 
          top: '0.75rem', 
          right: '0.75rem', 
          display: 'flex',
          gap: '0.5rem',
          zIndex: 2
        }}>
          <Tooltip title="Reset data">
            <IconButton 
              size="small" 
              onClick={handleResetClick}
              onMouseEnter={() => setIsResetHovered(true)}
              onMouseLeave={() => setIsResetHovered(false)}
              sx={{
                width: '28px',
                height: '28px',
                backgroundColor: isResetHovered ? `${accentColor}20` : 'transparent',
                border: `1px solid ${isResetHovered ? accentColor : 'transparent'}`,
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'rotate(-45deg)',
                },
                '&:active': {
                  transform: 'rotate(-90deg)',
                }
              }}
            >
              <RotateCcw size={14} color={isResetHovered ? accentColor : '#6B7280'} />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="View database records">
            <IconButton 
              size="small"
              onClick={handleDatabaseClick}
              onMouseEnter={() => setIsDatabaseHovered(true)}
              onMouseLeave={() => setIsDatabaseHovered(false)}
              sx={{
                width: '28px',
                height: '28px',
                backgroundColor: isDatabaseHovered ? `${accentColor}20` : 'transparent',
                border: `1px solid ${isDatabaseHovered ? accentColor : 'transparent'}`,
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                },
                '&:active': {
                  transform: 'translateY(0)',
                  backgroundColor: `${accentColor}40`,
                }
              }}
            >
              <Database size={14} color={isDatabaseHovered ? accentColor : '#6B7280'} />
            </IconButton>
          </Tooltip>
        </Box>

        <Typography 
          variant="h6" 
          sx={{ 
            mb: 1.5, 
            color: '#424242',
            fontWeight: 600,
            fontSize: '1rem',
            borderBottom: '2px solid #bdbdbd',
            pb: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <Box sx={{ 
            width: 28, 
            height: 28, 
            borderRadius: '8px', 
            backgroundColor: `${accentColor}20`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 0 8px ${accentColor}30`
          }}>
            {React.cloneElement(icon as React.ReactElement, { 
              size: 14,
              color: accentColor,
              strokeWidth: 2
            })}
          </Box>
          {title}
        </Typography>

        <Box sx={{ color: '#6B7280' }}>
          {children}
        </Box>
      </Box>

      {/* Reset Confirmation Dialog */}
      <Dialog 
        open={isResetDialogOpen} 
        onClose={() => setIsResetDialogOpen(false)}
      >
        <DialogTitle>Reset {title} data?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will reset all fields in this card to their default values. This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsResetDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleResetConfirm} variant="contained" color="primary" autoFocus>
            Reset
          </Button>
        </DialogActions>
      </Dialog>

      {/* Database Dialog */}
      <Dialog 
        open={isDatabaseDialogOpen} 
        onClose={() => setIsDatabaseDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Database Records: {title}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Showing recent database records for this section.
          </DialogContentText>
          
          {/* Mock database records display */}
          <Box sx={{ 
            maxHeight: '300px', 
            overflowY: 'auto', 
            border: '1px solid #E5E7EB',
            borderRadius: '8px',
            p: 1
          }}>
            {[1, 2, 3].map((item) => (
              <Box 
                key={item}
                sx={{ 
                  p: 1.5, 
                  borderBottom: item < 3 ? '1px solid #E5E7EB' : 'none',
                  '&:hover': { backgroundColor: '#F9FAFB' }
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Record #{item} - {new Date().toLocaleDateString()}
                </Typography>
                <Typography variant="body2" sx={{ color: '#6B7280', fontSize: '0.8rem' }}>
                  Last modified by: System Admin
                </Typography>
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDatabaseDialogOpen(false)}>Close</Button>
          <Button onClick={handleDatabaseConfirm} variant="outlined" color="primary">
            Refresh Data
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

// Updated FieldRow component with left label and right value (dropdown or text field)
const FieldRow: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <Box sx={{ 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    mb: 1,
    py: 0.5
  }}>
    <Typography 
      variant="body2" 
      sx={{ 
        color: '#757575',
        fontSize: '0.8rem'
      }}
    >
      {label}:
    </Typography>
    <Box sx={{ width: '60%' }}>
      {value}
    </Box>
  </Box>
);

const SnapshotSection: React.FC = () => {
  // State for the form controls in each card
  const [onlineStatus, setOnlineStatus] = useState('Strong');
  const [socialMedia, setSocialMedia] = useState('Active');
  const [webDescription, setWebDescription] = useState('');
  const [socialDescription, setSocialDescription] = useState('');

  const [riskLevel, setRiskLevel] = useState('Low');
  const [lastCheck, setLastCheck] = useState('12/05/2023');
  const [anomalyDesc, setAnomalyDesc] = useState('');
  const [riskDetails, setRiskDetails] = useState('');

  const [filingsStatus, setFilingsStatus] = useState('Complete');
  const [lastReturn, setLastReturn] = useState('Mar 2023');
  const [filingDetails, setFilingDetails] = useState('');
  const [returnNotes, setReturnNotes] = useState('');
  
  const [verificationStatus, setVerificationStatus] = useState('Completed');
  const [propertyType, setPropertyType] = useState('Owner');
  const [verificationDetails, setVerificationDetails] = useState('');
  const [propertyNotes, setPropertyNotes] = useState('');

  const [checkStatus, setCheckStatus] = useState('Cleared');
  const [exceptions, setExceptions] = useState('None');
  const [checkDetails, setCheckDetails] = useState('');
  const [exceptionNotes, setExceptionNotes] = useState('');

  const handleFileUpload = (fileType: string) => (files: FileList) => {
    console.log(`Uploading ${fileType} files:`, files);
    // Add your file upload logic here
  };

  return (
    <Box>
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
        Snapshot
      </Typography>

      <Grid container spacing={2}>
        {/* Card 1: Online Activity */}
        <Grid item xs={12} md={2.4}>
          <InfoCard title="Online Activity" icon={<Network />} accentColor="#2563EB">
            <FieldRow 
              label="Web Presence" 
              value={
                <Select
                  fullWidth
                  size="small"
                  value={onlineStatus}
                  onChange={(e) => setOnlineStatus(e.target.value)}
                  sx={{ fontSize: '0.8rem', height: '32px' }}
                >
                  <MenuItem value="Strong">Strong</MenuItem>
                  <MenuItem value="Moderate">Moderate</MenuItem>
                  <MenuItem value="Weak">Weak</MenuItem>
                </Select>
              } 
            />
            <FieldRow 
              label="Social Media" 
              value={
                <Select
                  fullWidth
                  size="small"
                  value={socialMedia}
                  onChange={(e) => setSocialMedia(e.target.value)}
                  sx={{ fontSize: '0.8rem', height: '32px' }}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Moderate">Moderate</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              } 
            />
            <FieldRow 
              label="Web Details" 
              value={
                <TextField
                  fullWidth
                  size="small"
                  variant="standard"
                  value={webDescription}
                  onChange={(e) => setWebDescription(e.target.value)}
                  sx={{ fontSize: '0.8rem' }}
                />
              } 
            />
            <FieldRow 
              label="Social Notes" 
              value={
                <TextField
                  fullWidth
                  size="small"
                  variant="standard"
                  value={socialDescription}
                  onChange={(e) => setSocialDescription(e.target.value)}
                  sx={{ fontSize: '0.8rem' }}
                />
              } 
            />
          </InfoCard>
        </Grid>

        {/* Card 2: Anomalous Activity Check */}
        <Grid item xs={12} md={2.4}>
          <InfoCard title="Anomalous Activity" icon={<Search />} accentColor="#8B5CF6">
            <FieldRow 
              label="Risk Level" 
              value={
                <Select
                  fullWidth
                  size="small"
                  value={riskLevel}
                  onChange={(e) => setRiskLevel(e.target.value)}
                  sx={{ fontSize: '0.8rem', height: '32px' }}
                >
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                </Select>
              } 
            />
            <FieldRow 
              label="Last Check" 
              value={
                <TextField
                  fullWidth
                  size="small"
                  variant="standard"
                  value={lastCheck}
                  onChange={(e) => setLastCheck(e.target.value)}
                  sx={{ fontSize: '0.8rem' }}
                />
              } 
            />
            <FieldRow 
              label="Description" 
              value={
                <TextField
                  fullWidth
                  size="small"
                  variant="standard"
                  value={anomalyDesc}
                  onChange={(e) => setAnomalyDesc(e.target.value)}
                  sx={{ fontSize: '0.8rem' }}
                />
              } 
            />
            <FieldRow 
              label="Risk Details" 
              value={
                <TextField
                  fullWidth
                  size="small"
                  variant="standard"
                  value={riskDetails}
                  onChange={(e) => setRiskDetails(e.target.value)}
                  sx={{ fontSize: '0.8rem' }}
                />
              } 
            />
          </InfoCard>
        </Grid>

        {/* Card 3: Returns & Filings */}
        <Grid item xs={12} md={2.4}>
          <InfoCard title="Returns & Filings" icon={<FileText />} accentColor="#F97316">
            <FieldRow 
              label="Filings" 
              value={
                <Select
                  fullWidth
                  size="small"
                  value={filingsStatus}
                  onChange={(e) => setFilingsStatus(e.target.value)}
                  sx={{ fontSize: '0.8rem', height: '32px' }}
                >
                  <MenuItem value="Complete">Complete</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Incomplete">Incomplete</MenuItem>
                </Select>
              } 
            />
            <FieldRow 
              label="Last Return" 
              value={
                <TextField
                  fullWidth
                  size="small"
                  variant="standard"
                  value={lastReturn}
                  onChange={(e) => setLastReturn(e.target.value)}
                  sx={{ fontSize: '0.8rem' }}
                />
              } 
            />
            <FieldRow 
              label="Filing Details" 
              value={
                <TextField
                  fullWidth
                  size="small"
                  variant="standard"
                  value={filingDetails}
                  onChange={(e) => setFilingDetails(e.target.value)}
                  sx={{ fontSize: '0.8rem' }}
                />
              } 
            />
            <FieldRow 
              label="Return Notes" 
              value={
                <TextField
                  fullWidth
                  size="small"
                  variant="standard"
                  value={returnNotes}
                  onChange={(e) => setReturnNotes(e.target.value)}
                  sx={{ fontSize: '0.8rem' }}
                />
              } 
            />
          </InfoCard>
        </Grid>

        {/* Card 4: Residential Checks */}
        <Grid item xs={12} md={2.4}>
          <InfoCard title="Residential Checks" icon={<Home />} accentColor="#10B981">
            <FieldRow 
              label="Verification" 
              value={
                <Select
                  fullWidth
                  size="small"
                  value={verificationStatus}
                  onChange={(e) => setVerificationStatus(e.target.value)}
                  sx={{ fontSize: '0.8rem', height: '32px' }}
                >
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Not Required">Not Required</MenuItem>
                </Select>
              } 
            />
            <FieldRow 
              label="Property Type" 
              value={
                <Select
                  fullWidth
                  size="small"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  sx={{ fontSize: '0.8rem', height: '32px' }}
                >
                  <MenuItem value="Owner">Owner</MenuItem>
                  <MenuItem value="Rented">Rented</MenuItem>
                  <MenuItem value="Lease">Lease</MenuItem>
                </Select>
              } 
            />
            <FieldRow 
              label="Verify Details" 
              value={
                <TextField
                  fullWidth
                  size="small"
                  variant="standard"
                  value={verificationDetails}
                  onChange={(e) => setVerificationDetails(e.target.value)}
                  sx={{ fontSize: '0.8rem' }}
                />
              } 
            />
            <FieldRow 
              label="Property Notes" 
              value={
                <TextField
                  fullWidth
                  size="small"
                  variant="standard"
                  value={propertyNotes}
                  onChange={(e) => setPropertyNotes(e.target.value)}
                  sx={{ fontSize: '0.8rem' }}
                />
              } 
            />
          </InfoCard>
        </Grid>

        {/* Card 5: NoGo Checks */}
        <Grid item xs={12} md={2.4}>
          <InfoCard title="NoGo Checks" icon={<AlertOctagon />} accentColor="#6366F1">
            <FieldRow 
              label="Status" 
              value={
                <Select
                  fullWidth
                  size="small"
                  value={checkStatus}
                  onChange={(e) => setCheckStatus(e.target.value)}
                  sx={{ fontSize: '0.8rem', height: '32px' }}
                >
                  <MenuItem value="Cleared">Cleared</MenuItem>
                  <MenuItem value="Failed">Failed</MenuItem>
                  <MenuItem value="Warning">Warning</MenuItem>
                </Select>
              } 
            />
            <FieldRow 
              label="Exceptions" 
              value={
                <Select
                  fullWidth
                  size="small"
                  value={exceptions}
                  onChange={(e) => setExceptions(e.target.value)}
                  sx={{ fontSize: '0.8rem', height: '32px' }}
                >
                  <MenuItem value="None">None</MenuItem>
                  <MenuItem value="Minor">Minor</MenuItem>
                  <MenuItem value="Major">Major</MenuItem>
                </Select>
              } 
            />
            <FieldRow 
              label="Check Details" 
              value={
                <TextField
                  fullWidth
                  size="small"
                  variant="standard"
                  value={checkDetails}
                  onChange={(e) => setCheckDetails(e.target.value)}
                  sx={{ fontSize: '0.8rem' }}
                />
              } 
            />
            <FieldRow 
              label="Notes" 
              value={
                <TextField
                  fullWidth
                  size="small"
                  variant="standard"
                  value={exceptionNotes}
                  onChange={(e) => setExceptionNotes(e.target.value)}
                  sx={{ fontSize: '0.8rem' }}
                />
              } 
            />
          </InfoCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SnapshotSection;