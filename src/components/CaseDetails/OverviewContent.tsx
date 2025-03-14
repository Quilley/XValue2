import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  TextField,
  MenuItem,
  Switch,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  FormControlLabel,
  ThemeProvider,
  createTheme,
  Tooltip,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
  InputAdornment
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Plus, Trash2, AlertCircle, MapPin, User, Users, FileText, TrendingUp, Percent, CreditCard, Coins, Building, BarChartHorizontal, FileCheck, MapIcon } from 'lucide-react';
import dayjs from 'dayjs';
import AddressGrid from '../AddressGrid';
import { useDarkMode } from '../../App';
import CIBILCard from './CIBILCard';

// Modified theme with Akkurat Pro font
const akkuratTheme = createTheme({
  typography: {
    fontFamily: '"Akkurat Pro", "Helvetica Neue", Helvetica, Arial, sans-serif',
    h6: {
      fontWeight: 600,
      letterSpacing: '-0.025em',
    },
    h5: {
      fontWeight: 700,
      letterSpacing: '-0.025em',
    },
    body1: {
      fontSize: '0.875rem',
    },
    subtitle1: {
      fontSize: '0.75rem',
      fontWeight: 500,
    }
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          color: '#344054',
          borderBottom: '2px solid #E5E7EB',
          padding: '12px 16px',
          fontSize: '0.875rem',
        },
        body: {
          padding: '12px 16px',
          borderColor: '#F3F4F6',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          fontWeight: 600,
        }
      }
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          padding: 8,
        },
        track: {
          borderRadius: 12,
        },
        thumb: {
          boxShadow: 'none',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          fontSize: '0.875rem',
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#90CAF9',
          },
        },
        input: {
          fontSize: '0.875rem',
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        }
      }
    }
  }
});

// Define types for our grid data
interface CustomerRow {
  id: string;
  selected: boolean;
  applicantType: 'Applicant' | 'Co-applicant';
  name: string;
  mobile: string; // Added mobile field
  relationship: 'Proprietorship' | 'Trust' | 'Society' | 'Pvt Ltd';
  shareholding: string;
  bureauScore: string;
  dateOfBirth: dayjs.Dayjs | null;
  age: number;
  ageAtMaturity: number;
}

// Define props
interface OverviewContentProps {
  loanTenureMonths?: number;
}

// Info Card Component
interface InfoCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  accentColor?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, icon, children, accentColor = '#2563EB' }) => {
  // Generate a lighter shade of the accent color for the background
  const bgColor = `${accentColor}0A`; // 0A is 4% opacity in hex

  return (
    <Card 
      variant="outlined" 
      sx={{ 
        height: '100%', 
        borderColor: '#E5E7EB',
        position: 'relative',
        backgroundColor: bgColor,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.2s ease-in-out',
        transform: 'translateY(0)',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.12)',
        },
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '4px',
          height: '100%',
          backgroundColor: accentColor,
          borderTopLeftRadius: '12px',
          borderBottomLeftRadius: '12px'
        }
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box sx={{ 
            width: 40, 
            height: 40, 
            borderRadius: '12px', 
            backgroundColor: `${accentColor}20`, // 20 is 12% opacity
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 1.5,
            boxShadow: `0 2px 8px ${accentColor}30`, // Inner glow effect
          }}>
            {React.cloneElement(icon as React.ReactElement, { 
              size: 20, 
              color: accentColor,
              strokeWidth: 2
            })}
          </Box>
          <Typography variant="h6" sx={{ fontSize: '1.125rem', color: '#111827', fontWeight: 600 }}>
            {title}
          </Typography>
        </Box>
        {children}
      </CardContent>
    </Card>
  );
};

// Field Row for Info Cards
const FieldRow: React.FC<{ label: string; value: string | React.ReactNode }> = ({ label, value }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
    <Typography variant="body2" sx={{ color: '#6B7280', fontWeight: 500 }}>
      {label}
    </Typography>
    <Typography variant="body1" sx={{ fontWeight: 600, color: '#111827' }}>
      {value}
    </Typography>
  </Box>
);

const OverviewContent: React.FC<OverviewContentProps> = ({ loanTenureMonths = 48 }) => {
  const { isDarkMode } = useDarkMode();
  const [rows, setRows] = useState<CustomerRow[]>([
    {
      id: '1',
      selected: true,
      applicantType: 'Applicant',
      name: '',
      mobile: '', // Default value for mobile
      relationship: 'Proprietorship',
      shareholding: '',
      bureauScore: '',
      dateOfBirth: null,
      age: 0,
      ageAtMaturity: 0
    }
  ]);

  // Program type state for Card 2
  const [programType, setProgramType] = useState<string>("Banking");
  const [loanAmount, setLoanAmount] = useState<string>("1500000");

  // Update the theme to respect dark mode
  const theme = createTheme({
    ...akkuratTheme,
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      background: {
        default: isDarkMode ? '#121212' : '#f3f4f6',
        paper: isDarkMode ? '#1e1e1e' : '#ffffff',
      },
      text: {
        primary: isDarkMode ? '#ffffff' : '#111827',
        secondary: isDarkMode ? '#aaaaaa' : '#6B7280',
      }
    },
  });

  // Function to add a new row
  const addRow = () => {
    const newRow: CustomerRow = {
      id: `row-${Date.now()}`,
      selected: true,
      applicantType: 'Co-applicant',
      name: '',
      mobile: '',
      relationship: 'Proprietorship',
      shareholding: '',
      bureauScore: '',
      dateOfBirth: null,
      age: 0,
      ageAtMaturity: 0
    };
    
    setRows([...rows, newRow]);
  };

  // Function to delete a row
  const deleteRow = (id: string) => {
    setRows(rows.filter(row => row.id !== id));
  };

  // Function to toggle row selection
  const toggleRowSelection = (id: string) => {
    setRows(rows.map(row => 
      row.id === id ? { ...row, selected: !row.selected } : row
    ));
  };

  // Function to update a row field
  const updateRow = (id: string, field: keyof CustomerRow, value: any) => {
    setRows(rows.map(row => {
      if (row.id === id) {
        const updatedRow = { ...row, [field]: value };
        
        // If date of birth is updated, recalculate age and age at maturity
        if (field === 'dateOfBirth' && value) {
          const now = dayjs();
          const birthDate = value;
          const age = now.diff(birthDate, 'year');
          updatedRow.age = age;
          updatedRow.ageAtMaturity = age + (loanTenureMonths / 12);
        }
        
        return updatedRow;
      }
      return row;
    }));
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className="space-y-8">
        {/* Info Cards Section */}
        <Grid container spacing={3}>
          {/* Card 1: Location Info */}
          <Grid item xs={12} md={4}>
            <InfoCard title="Location Information" icon={<Building />} accentColor="#2563EB">
              <FieldRow 
                label="Branch Location" 
                value={
                  <TextField
                    variant="standard"
                    defaultValue="Mumbai Central"
                    sx={{ 
                      backgroundColor: 'transparent',
                      '& .MuiInput-underline:before': {
                        borderBottomColor: 'transparent'
                      },
                      '&:hover .MuiInput-underline:before': {
                        borderBottomColor: '#2563EB40'
                      }
                    }}
                  />
                } 
              />
              <FieldRow 
                label="SM Name" 
                value={
                  <TextField
                    variant="standard"
                    defaultValue="Rajat Sharma"
                    sx={{ 
                      backgroundColor: 'transparent',
                      '& .MuiInput-underline:before': {
                        borderBottomColor: 'transparent'
                      },
                      '&:hover .MuiInput-underline:before': {
                        borderBottomColor: '#2563EB40'
                      }
                    }}
                  />
                }
              />
              <FieldRow 
                label="DSA Name" 
                value={
                  <TextField
                    variant="standard"
                    defaultValue="Fintech Solutions Ltd."
                    sx={{ 
                      backgroundColor: 'transparent',
                      '& .MuiInput-underline:before': {
                        borderBottomColor: 'transparent'
                      },
                      '&:hover .MuiInput-underline:before': {
                        borderBottomColor: '#2563EB40'
                      }
                    }}
                  />
                }
              />
            </InfoCard>
          </Grid>

          {/* Card 2: Loan Info */}
          <Grid item xs={12} md={4}>
            <InfoCard title="Loan Information" icon={<Coins />} accentColor="#8B5CF6">
              <FieldRow 
                label="Program Type" 
                value={
                  <FormControl size="small" variant="outlined" sx={{ minWidth: 120 }}>
                    <Select
                      value={programType}
                      onChange={(e) => setProgramType(e.target.value as string)}
                      sx={{ fontSize: '0.875rem', height: '32px' }}
                    >
                      <MenuItem value="Banking">Banking</MenuItem>
                      <MenuItem value="ABB Plus">ABB Plus</MenuItem>
                      <MenuItem value="ITR">ITR</MenuItem>
                    </Select>
                  </FormControl>
                } 
              />
              <FieldRow 
                label="Loan Amount" 
                value={
                  <TextField
                    size="small"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                      sx: { fontSize: '0.875rem' }
                    }}
                    sx={{ maxWidth: '140px' }}
                  />
                } 
              />
              <FieldRow label="ROI" value="12.5%" />
              <FieldRow label="EMI" value="₹39,575" />
            </InfoCard>
          </Grid>

          {/* Card 3: Deviation Info */}
          <Grid item xs={12} md={4}>
            <InfoCard title="Deviations" icon={<BarChartHorizontal />} accentColor="#F97316">
              <Box sx={{ color: '#6B7280', mt: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ 
                    width: 8, 
                    height: 8, 
                    borderRadius: '50%', 
                    backgroundColor: '#F97316', 
                    mr: 1.5 
                  }}></Box>
                  <Typography variant="body2">ROI deviation by 0.5%</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ 
                    width: 8, 
                    height: 8, 
                    borderRadius: '50%', 
                    backgroundColor: '#F97316', 
                    mr: 1.5 
                  }}></Box>
                  <Typography variant="body2">LTV exceeds policy by 5%</Typography>
                </Box>
                <Typography variant="body2" sx={{ color: '#9CA3AF', fontStyle: 'italic', fontSize: '0.75rem', mt: 2 }}>
                  Approval required for policy exceptions
                </Typography>
              </Box>
            </InfoCard>
          </Grid>
        </Grid>

        {/* Customer Details Section */}
        <Box className="flex items-center justify-between" sx={{ mt: 4 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontSize: '1.25rem',
              color: '#111827',
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
            Customer Details
          </Typography>
          
          <Tooltip title="Add all required customer information">
            <IconButton size="small" sx={{ color: '#6B7280' }}>
              <AlertCircle size={18} />
            </IconButton>
          </Tooltip>
        </Box>

        <Paper 
          elevation={0} 
          sx={{ 
            border: '1px solid #E5E7EB', 
            borderRadius: '12px', 
            overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#F9FAFB' }}>
                  <TableCell padding="checkbox" sx={{ width: '60px' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.75rem' }}>
                      Select
                    </Typography>
                  </TableCell>
                  <TableCell>Applicant Type</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Mobile</TableCell> {/* New column */}
                  <TableCell>Relationship</TableCell>
                  <TableCell>Shareholding</TableCell>
                  <TableCell>Bureau Score</TableCell>
                  <TableCell>DOB/DOI</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Age at Loan Maturity</TableCell>
                  <TableCell padding="checkbox" sx={{ width: '50px' }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow 
                    key={row.id} 
                    sx={{
                      backgroundColor: row.selected ? 'rgba(239, 246, 255, 0.6)' : 'white',
                      '&:hover': {
                        backgroundColor: row.selected ? 'rgba(239, 246, 255, 0.8)' : 'rgba(249, 250, 251, 0.5)',
                      },
                      transition: 'background-color 0.2s ease',
                    }}
                  >
                    <TableCell padding="checkbox">
                      <FormControlLabel
                        control={
                          <Switch
                            checked={row.selected}
                            onChange={() => toggleRowSelection(row.id)}
                            color="primary"
                            sx={{ 
                              '& .MuiSwitch-switchBase.Mui-checked': {
                                color: '#2563EB',
                              },
                              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                backgroundColor: '#BFDBFE',
                              },
                            }}
                          />
                        }
                        label=""
                      />
                    </TableCell>
                    <TableCell>
                      <FormControl variant="outlined" fullWidth size="small" sx={{ minWidth: 120 }}>
                        <InputLabel>Type</InputLabel>
                        <Select
                          value={row.applicantType}
                          onChange={(e) => updateRow(row.id, 'applicantType', e.target.value)}
                          label="Type"
                          sx={{ 
                            borderRadius: '6px',
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#2563EB',
                              borderWidth: '1px'
                            }
                          }}
                        >
                          <MenuItem value="Applicant">Applicant</MenuItem>
                          <MenuItem value="Co-applicant">Co-applicant</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <TextField
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={row.name}
                        onChange={(e) => updateRow(row.id, 'name', e.target.value)}
                        placeholder="Enter name"
                        sx={{ 
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '6px'
                          },
                          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#2563EB',
                            borderWidth: '1px'
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell> {/* New Mobile column */}
                      <TextField
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={row.mobile}
                        onChange={(e) => updateRow(row.id, 'mobile', e.target.value)}
                        placeholder="Enter mobile"
                        inputProps={{ maxLength: 10 }}
                        sx={{ 
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '6px'
                          },
                          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#2563EB',
                            borderWidth: '1px'
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <FormControl variant="outlined" fullWidth size="small">
                        <InputLabel>Relationship</InputLabel>
                        <Select
                          value={row.relationship}
                          onChange={(e) => updateRow(row.id, 'relationship', e.target.value)}
                          label="Relationship"
                          sx={{ 
                            borderRadius: '6px',
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#2563EB',
                              borderWidth: '1px'
                            }
                          }}
                        >
                          <MenuItem value="Proprietorship">Proprietorship</MenuItem>
                          <MenuItem value="Trust">Trust</MenuItem>
                          <MenuItem value="Society">Society</MenuItem>
                          <MenuItem value="Pvt Ltd">Pvt Ltd</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <TextField
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={row.shareholding}
                        onChange={(e) => updateRow(row.id, 'shareholding', e.target.value)}
                        placeholder="%"
                        sx={{ 
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '6px'
                          },
                          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#2563EB',
                            borderWidth: '1px'
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        variant="outlined"
                        fullWidth
                        size="small"
                        type="number"
                        value={row.bureauScore}
                        onChange={(e) => updateRow(row.id, 'bureauScore', e.target.value)}
                        placeholder="Score"
                        inputProps={{ min: 0, max: 900 }}
                        sx={{ 
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '6px'
                          },
                          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#2563EB',
                            borderWidth: '1px'
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          value={row.dateOfBirth}
                          onChange={(newValue) => updateRow(row.id, 'dateOfBirth', newValue)}
                          slotProps={{ 
                            textField: { 
                              size: 'small', 
                              fullWidth: true,
                              sx: { 
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: '6px'
                                },
                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                  borderColor: '#2563EB',
                                  borderWidth: '1px'
                                }
                              } 
                            } 
                          }}
                        />
                      </LocalizationProvider>
                    </TableCell>
                    <TableCell>
                      <TextField
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={row.age}
                        disabled
                        sx={{ 
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: '#F9FAFB',
                            borderRadius: '6px'
                          } 
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={row.ageAtMaturity.toFixed(1)}
                        disabled
                        sx={{ 
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: '#F9FAFB',
                            borderRadius: '6px'
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell padding="checkbox">
                      {rows.length > 1 && (
                        <Tooltip title="Remove applicant">
                          <IconButton 
                            size="small" 
                            onClick={() => deleteRow(row.id)}
                            sx={{ 
                              color: '#EF4444',
                              '&:hover': {
                                backgroundColor: 'rgba(239, 68, 68, 0.04)'
                              }
                            }}
                          >
                            <Trash2 size={16} />
                          </IconButton>
                        </Tooltip>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          {/* Centered Add Customer button */}
          <Box 
            sx={{ 
              padding: '12px', 
              display: 'flex', 
              justifyContent: 'center', 
              borderTop: '1px solid #F3F4F6'
            }}
          >
            <Button
              variant="outlined"
              startIcon={<Plus size={16} />}
              onClick={addRow}
              sx={{ 
                borderColor: '#2563EB',
                color: '#2563EB',
                '&:hover': {
                  backgroundColor: '#EBF5FF',
                  borderColor: '#2563EB'
                },
                px: 3,
                py: 1
              }}
            >
              Add Customer
            </Button>
          </Box>
        </Paper>
        
        {/* Address Details Section */}
        <Box className="flex items-center justify-between" sx={{ mt: 4 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontSize: '1.25rem',
              color: '#111827',
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
            Address Details
          </Typography>
          
          <Tooltip title="Add address information for all customers">
            <IconButton size="small" sx={{ color: '#6B7280' }}>
              <AlertCircle size={18} />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Address Grid */}
        <AddressGrid customerNames={rows.filter(r => r.selected).map(r => r.name || 'Unnamed Customer')} />
        
        {/* More Customer Details section */}
        <Box sx={{ marginTop: '2rem' }}>
          <Typography 
            variant="h6"
            sx={{ 
              fontSize: '1.25rem',
              color: isDarkMode ? '#fff' : '#111827',
              position: 'relative',
              marginBottom: '1.5rem',
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
            More Customer Details
          </Typography>
          
          <Paper 
            elevation={0} 
            sx={{ 
              border: '1px solid',
              borderColor: isDarkMode ? '#333' : '#E5E7EB',
              borderRadius: '12px', 
              overflow: 'hidden',
              padding: '1.5rem',
              backgroundColor: isDarkMode ? '#1e1e1e' : '#fff',
            }}
          >
            {/* CIBIL Cards */}
            <Grid container spacing={3}>
              {rows.filter(row => row.selected).map((row, index) => (
                <Grid item xs={12} sm={6} md={3} key={row.id}>
                  <CIBILCard 
                    customerName={row.name || `Customer ${index + 1}`}
                    cibilScore={row.bureauScore || 'NA'}
                    abb={25000 + (index * 5000)}
                    overdue={index * 1500}
                    runningLoans={index + 1}
                    isDarkMode={isDarkMode}
                  />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default OverviewContent;