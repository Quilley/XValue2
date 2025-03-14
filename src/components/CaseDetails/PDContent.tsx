import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  FormControl, 
  Select, 
  MenuItem, 
  Grid, 
  IconButton, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  Button,
  TextField,
  Tooltip,
  Divider,
  Paper
} from '@mui/material';
import { Phone, MapPin, Plus, Upload, X, FileText } from 'lucide-react';

interface PDContentProps {
  // You can add props as needed
}

interface Customer {
  id: string;
  name: string;
  mobile: string;
  pincode: string;
}

const PDContent: React.FC<PDContentProps> = () => {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
  const [selectedMapCustomerId, setSelectedMapCustomerId] = useState<string>('');
  const [isCallDialogOpen, setIsCallDialogOpen] = useState(false);
  const [callAnimation, setCallAnimation] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>(['']);
  const [selectedPD, setSelectedPD] = useState<string>('PD #1');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadedPostPDFiles, setUploadedPostPDFiles] = useState<{
    type: string;
    files: File[];
  }>({
    type: '',
    files: []
  });
  
  // Mock customer data - in a real app this would come from props or context
  const customers: Customer[] = [
    { id: '1', name: 'John Doe', mobile: '9876543210', pincode: '400001' },
    { id: '2', name: 'Jane Smith', mobile: '8765432109', pincode: '400050' },
    { id: '3', name: 'Robert Johnson', mobile: '7654321098', pincode: '400071' }
  ];

  const selectedCustomer = customers.find(c => c.id === selectedCustomerId);
  const selectedMapCustomer = customers.find(c => c.id === selectedMapCustomerId);

  // Generate map embed URL based on pincode
  const getMapEmbedUrl = (pincode?: string) => {
    if (!pincode) return 'https://www.openstreetmap.org/export/embed.html?bbox=72.80,19.00,73.00,19.15&layer=mapnik';
    
    // For Mumbai pincodes (400001-400107)
    const lat = 19.0760;
    const lng = 72.8777;
    return `https://www.openstreetmap.org/export/embed.html?bbox=${lng-0.1},${lat-0.1},${lng+0.1},${lat+0.1}&layer=mapnik&marker=${lat},${lng}`;
  };

  const handleCallClick = () => {
    setCallAnimation(true);
    setTimeout(() => {
      setCallAnimation(false);
      setIsCallDialogOpen(true);
    }, 400);
  };

  const handleCallDialogClose = () => {
    setIsCallDialogOpen(false);
  };

  const handleCallOption = (option: string) => {
    console.log(`Selected option: ${option} for number ${selectedCustomer?.mobile}`);
    setIsCallDialogOpen(false);
  };

  const handleCustomerChange = (index: number, customerId: string) => {
    const newSelectedCustomers = [...selectedCustomers];
    newSelectedCustomers[index] = customerId;
    setSelectedCustomers(newSelectedCustomers);
  };

  const handleAddCustomer = () => {
    setSelectedCustomers([...selectedCustomers, '']);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setUploadedFiles([...uploadedFiles, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
  };

  const handlePostPDFileUpload = (type: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setUploadedPostPDFiles({
        type,
        files: [...uploadedPostPDFiles.files, ...newFiles]
      });
    }
  };

  return (
    <Box>
      {/* Snapshot Header */}
      <Typography 
        variant="h6" 
        sx={{ 
          mb: 2, // Reduced margin from 3 to 2
          fontWeight: 600,
          position: 'relative',
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: '-6px', // Reduced from -8px to -6px
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

      {/* Cards Container */}
      <Grid container spacing={2}>
        {/* 30% Contact Card */}
        <Grid item xs={12} md={3.6}>
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
              borderRadius: '12px', // Match the OverviewContent card radius
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 16px rgba(189,189,189,0.2)',
                '&::after': {
                  opacity: 1
                }
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
                transition: 'opacity 0.3s ease'
              }
            }}
          >
            <CardContent sx={{ position: 'relative', zIndex: 1, py: 1.5, px: 2 }}> {/* Reduced padding */}
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 2, // Reduced margin from 3 to 2
                  color: '#424242',
                  fontWeight: 600,
                  fontSize: '1rem', // Reduced from 1.1rem
                  borderBottom: '2px solid #bdbdbd',
                  pb: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5
                }}
              >
                <Box sx={{ 
                  width: 28, // Reduced from 32
                  height: 28, // Reduced from 32
                  borderRadius: '8px', // Reduced from 10px
                  backgroundColor: '#2563EB20',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 8px #2563EB30'
                }}>
                  <Phone size={14} color="#2563EB" strokeWidth={2} /> {/* Reduced from 16 */}
                </Box>
                Customer Contact
              </Typography>
            
              {/* Customer Dropdown */}
              <FormControl fullWidth sx={{ mb: 2 }}> {/* Reduced margin from 3 to 2 */}
                <Typography variant="subtitle2" sx={{ mb: 0.5, color: '#6B7280', fontSize: '0.8rem' }}> {/* Reduced margin and font size */}
                  Select Customer
                </Typography>
                <Select
                  value={selectedCustomerId}
                  onChange={(e) => setSelectedCustomerId(e.target.value as string)}
                  displayEmpty
                  size="small" // Added small size
                  sx={{ 
                    borderRadius: '8px',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#E5E7EB'
                    }
                  }}
                >
                  <MenuItem value="">Select a customer</MenuItem>
                  {customers.map(customer => (
                    <MenuItem key={customer.id} value={customer.id}>{customer.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Mobile Number Display */}
              {selectedCustomer && (
                <Box sx={{ 
                  mt: 1, // Reduced from 2
                  p: 2, // Reduced from 3
                  border: '1px solid #E5E7EB', 
                  borderRadius: '8px',
                  backgroundColor: '#F9FAFB',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Box>
                    <Typography variant="body2" sx={{ color: '#6B7280', fontSize: '0.75rem' }}> {/* Reduced font size */}
                      Mobile Number
                    </Typography>
                    <Typography variant="h6" sx={{ 
                      color: '#111827', 
                      fontWeight: 600,
                      letterSpacing: '0.5px',
                      fontSize: '1rem' // Reduced font size
                    }}>
                      {selectedCustomer.mobile}
                    </Typography>
                  </Box>
                  <IconButton 
                    size="small" // Changed from default to small
                    sx={{
                      backgroundColor: '#2563EB',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#1D4ED8'
                      },
                      animation: callAnimation ? 'pulse 0.5s infinite' : 'none',
                      '@keyframes pulse': {
                        '0%': {
                          transform: 'scale(0.95)',
                          boxShadow: '0 0 0 0 rgba(37, 99, 235, 0.7)'
                        },
                        '70%': {
                          transform: 'scale(1)',
                          boxShadow: '0 0 0 10px rgba(37, 99, 235, 0)'
                        },
                        '100%': {
                          transform: 'scale(0.95)',
                          boxShadow: '0 0 0 0 rgba(37, 99, 235, 0)'
                        }
                      }
                    }}
                    onClick={handleCallClick}
                  >
                    <Phone size={18} /> {/* Reduced from 20 */}
                  </IconButton>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        {/* 70% Map Card */}
        <Grid item xs={12} md={8.4}>
          <Card 
            variant="outlined" 
            sx={{ 
              height: '100%',
              borderColor: '#bdbdbd',
              position: 'relative',
              backgroundColor: '#fff',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              borderRadius: '12px', // Match the OverviewContent card radius
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 16px rgba(189,189,189,0.2)',
                '&::after': {
                  opacity: 1
                }
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
                transition: 'opacity 0.3s ease'
              }
            }}
          >
            <CardContent sx={{ position: 'relative', zIndex: 1, pb: '0.5rem !important', py: 1.5, px: 2 }}> {/* Reduced padding */}
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 2, // Reduced from 3 to 2
                  color: '#424242',
                  fontWeight: 600,
                  fontSize: '1rem', // Reduced from 1.1rem
                  borderBottom: '2px solid #bdbdbd',
                  pb: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5
                }}
              >
                <Box sx={{ 
                  width: 28, // Reduced from 32
                  height: 28, // Reduced from 32
                  borderRadius: '8px', // Reduced from 10px
                  backgroundColor: '#10B98120',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 8px #10B98130'
                }}>
                  <MapPin size={14} color="#10B981" strokeWidth={2} /> {/* Reduced from 16 */}
                </Box>
                Location Map
              </Typography>
              
              {/* Map Container with Customer Dropdown (40%) and Map (60%) */}
              <Box sx={{ display: 'flex', height: '217px' }}> {/* Reduced by 25% from 290px */}
                <Box sx={{ width: '40%', pr: 2 }}>
                  <FormControl fullWidth>
                    <Typography variant="subtitle2" sx={{ mb: 0.5, color: '#6B7280', fontSize: '0.8rem' }}> {/* Reduced margin and font size */}
                      Select Customer Address
                    </Typography>
                    <Select
                      value={selectedMapCustomerId}
                      onChange={(e) => setSelectedMapCustomerId(e.target.value as string)}
                      displayEmpty
                      size="small" // Added small size
                      sx={{ 
                        borderRadius: '8px',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#E5E7EB'
                        }
                      }}
                    >
                      <MenuItem value="">Select a customer</MenuItem>
                      {customers.map(customer => (
                        <MenuItem key={customer.id} value={customer.id}>{customer.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  
                  {selectedMapCustomer && (
                    <Box sx={{ mt: 2 }}> {/* Reduced from 3 */}
                      <Typography variant="subtitle2" sx={{ color: '#6B7280', fontSize: '0.8rem' }}> {/* Reduced font size */}
                        Customer Details
                      </Typography>
                      <Box sx={{ 
                        mt: 0.5, // Reduced from 1
                        p: 1.5, // Reduced from 2
                        border: '1px solid #E5E7EB', 
                        borderRadius: '8px', 
                        backgroundColor: '#F9FAFB' 
                      }}>
                        <Typography variant="body2" sx={{ color: '#6B7280', mb: 0.5, fontSize: '0.75rem' }}> {/* Reduced margin and font size */}
                          Name
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#111827', fontWeight: 500, mb: 1, fontSize: '0.875rem' }}> {/* Reduced margin and font size */}
                          {selectedMapCustomer.name}
                        </Typography>
                        
                        <Typography variant="body2" sx={{ color: '#6B7280', mb: 0.5, fontSize: '0.75rem' }}> {/* Reduced margin and font size */}
                          Pincode
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#111827', fontWeight: 500, fontSize: '0.875rem' }}> {/* Reduced font size */}
                          {selectedMapCustomer.pincode}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Box>
                
                {/* Map Section (60%) */}
                <Box sx={{ width: '60%', height: '100%', borderRadius: '8px', overflow: 'hidden', border: '1px solid #E5E7EB' }}>
                  <iframe
                    title="Customer Location Map"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight={0}
                    marginWidth={0}
                    src={getMapEmbedUrl(selectedMapCustomer?.pincode)}
                    style={{ border: 0 }}
                    allowFullScreen
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* PD Voice Summary Section */}
      <Box sx={{ mt: 6 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 2,
            fontWeight: 600,
            position: 'relative',
            '&:after': {
              content: '""',
              position: 'absolute',
              bottom: '-6px',
              left: 0,
              width: '40px',
              height: '3px',
              backgroundColor: '#2563EB',
              borderRadius: '2px'
            }
          }}
        >
          PD Voice Summary
        </Typography>

        <Card 
          variant="outlined" 
          sx={{ 
            borderColor: '#bdbdbd',
            position: 'relative',
            backgroundColor: '#fff',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
            borderRadius: '12px', // Match the OverviewContent card radius
            '&:hover': {
              boxShadow: '0 4px 12px rgba(189,189,189,0.15)',
            }
          }}
        >
          <CardContent sx={{ p: 1.5 }}>
            <Box sx={{ display: 'flex', height: '100%' }}>
              {/* 20% Left Side - Customer Selection */}
              <Box sx={{ width: '20%', borderRight: '1px solid #E5E7EB', pr: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 1.5, color: '#6B7280', fontSize: '0.8rem' }}>
                  Participants
                </Typography>

                {/* Customer selection area */}
                <Box sx={{ mb: 2 }}>
                  {selectedCustomers.map((customerId, index) => (
                    <Box key={index} sx={{ mb: 1 }}>
                      <FormControl fullWidth size="small">
                        <Select
                          value={customerId}
                          onChange={(e) => handleCustomerChange(index, e.target.value as string)}
                          displayEmpty
                          sx={{ 
                            borderRadius: '8px',
                            fontSize: '0.8rem',
                            height: '32px', // Add this line to make it more compact
                            '& .MuiOutlinedInput-input': {
                              paddingTop: '7px',
                              paddingBottom: '7px',
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#E5E7EB'
                            }
                          }}
                        >
                          <MenuItem value="">Select participant</MenuItem>
                          {customers.map(customer => (
                            <MenuItem key={customer.id} value={customer.id}>{customer.name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  ))}

                  {/* Add Customer Button */}
                  <Box sx={{ mt: 1, textAlign: 'center' }}>
                    <IconButton 
                      size="small"
                      onClick={handleAddCustomer}
                      sx={{ 
                        backgroundColor: '#2563EB10',
                        '&:hover': { backgroundColor: '#2563EB20' } 
                      }}
                    >
                      <Plus size={16} color="#2563EB" />
                    </IconButton>
                  </Box>
                </Box>

                {/* PD Number Selection */}
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1, color: '#6B7280', fontSize: '0.8rem' }}>
                    PD Reference
                  </Typography>
                  <FormControl fullWidth size="small">
                    <Select
                      value={selectedPD}
                      onChange={(e) => setSelectedPD(e.target.value as string)}
                      sx={{ 
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#E5E7EB'
                        }
                      }}
                    >
                      <MenuItem value="PD #1">PD #1</MenuItem>
                      <MenuItem value="PD #2">PD #2</MenuItem>
                      <MenuItem value="PD #3">PD #3</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>

              {/* 80% Right Side Split into 50:50 */}
              <Box sx={{ width: '80%', pl: 2 }}>
                <Box sx={{ display: 'flex', height: '100%' }}>
                  {/* Full Summary Card - 50% of right side */}
                  <Box sx={{ width: '50%', pr: 1 }}>
                    <Typography variant="subtitle1" sx={{ mb: 1, color: '#111827', fontWeight: 600, fontSize: '0.9rem' }}>
                      Full Summary
                    </Typography>
                    <Box sx={{ 
                      p: 1.5, 
                      border: '1px solid #E5E7EB', 
                      borderRadius: '8px', 
                      height: 'calc(100% - 28px)', 
                      position: 'relative' 
                    }}>
                      <TextField
                        multiline
                        fullWidth
                        rows={6} // Reduced from 8
                        placeholder="Enter PD summary here..."
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': { 
                            border: 'none',
                            '& fieldset': { border: 'none' },
                          },
                          '& .MuiInputBase-input': {
                            fontSize: '0.85rem',
                          }
                        }}
                      />

                      {/* Upload Option */}
                      <Box sx={{ position: 'absolute', bottom: 8, right: 8 }}>
                        <Tooltip title="Upload voice recording">
                          <IconButton size="small" sx={{ backgroundColor: '#F3F4F6' }}>
                            <Upload size={24} color="#6B7280" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                  </Box>

                  {/* Key Highlights - 50% of right side */}
                  <Box sx={{ width: '50%', pl: 1 }}>
                    <Typography variant="subtitle1" sx={{ mb: 1, color: '#111827', fontWeight: 600, fontSize: '0.9rem' }}>
                      Key Highlights
                    </Typography>
                    <Box sx={{ 
                      p: 1.5, 
                      border: '1px solid #E5E7EB', 
                      borderRadius: '8px', 
                      height: 'calc(100% - 28px)' 
                    }}>
                      <TextField
                        multiline
                        fullWidth
                        rows={6} // Reduced from 8
                        placeholder="Enter key highlights from PD..."
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': { 
                            border: 'none',
                            '& fieldset': { border: 'none' },
                          },
                          '& .MuiInputBase-input': {
                            fontSize: '0.85rem',
                          }
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Call Dialog */}
      <Dialog open={isCallDialogOpen} onClose={handleCallDialogClose} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ borderBottom: '1px solid #E5E7EB', pb: 2 }}>
          Call this number?
        </DialogTitle>
        <DialogContent sx={{ mt: 2, p: 3 }}>
          <Typography variant="h6" sx={{ textAlign: 'center', color: '#111827', fontWeight: 600, fontSize: '1.5rem' }}>
            {selectedCustomer?.mobile}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Button 
            onClick={() => handleCallOption('later')}
            sx={{ 
              color: '#6B7280', 
              borderRadius: '8px',
              '&:hover': { backgroundColor: '#F3F4F6' } 
            }}
          >
            Later
          </Button>
          <Box>
            <Button 
              onClick={() => handleCallOption('call')}
              variant="contained"
              sx={{ 
                backgroundColor: '#2563EB', 
                borderRadius: '8px', 
                mr: 1,
                '&:hover': { backgroundColor: '#1D4ED8' } 
              }}
            >
              Call
            </Button>
            <Button 
              onClick={() => handleCallOption('callAI')}
              variant="outlined"
              sx={{ 
                borderColor: '#2563EB',
                color: '#2563EB',
                borderRadius: '8px',
                '&:hover': { backgroundColor: '#EBF5FF' } 
              }}
            >
              Call.AI
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PDContent;