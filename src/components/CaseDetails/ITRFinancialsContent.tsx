import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid,
  Card, 
  CardContent, 
  FormControl,
  Select,
  MenuItem,
  Paper,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip
} from '@mui/material';
import { 
  TrendingUp, 
  DollarSign, 
  BarChart2, 
  RefreshCcw, 
  FileText,
  Plus
} from 'lucide-react';

interface FinancialCardProps {
  title: string;
  icon: React.ReactNode;
  value: string;
  trend?: number;
  accentColor?: string;
}

const FinancialCard: React.FC<FinancialCardProps> = ({ 
  title, 
  icon, 
  value, 
  trend = 0,
  accentColor = "#2563EB" 
}) => {
  // State for hover effects
  const [isResetHovered, setIsResetHovered] = useState(false);
  
  return (
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
        borderRadius: '12px',
        // Reduce size by 20%
        transform: 'scale(0.95)',
        transformOrigin: 'top left',
        '&:hover': {
          transform: 'scale(0.95) translateY(-4px)',
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
      <CardContent sx={{ position: 'relative', zIndex: 1, p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
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
            {icon}
          </Box>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              ml: 1.5,
              fontWeight: 600,
              color: '#424242'
            }}
          >
            {title}
          </Typography>
          
          {/* Reset Button */}
          <Tooltip title="Reset data">
            <IconButton 
              size="small" 
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                width: '24px',
                height: '24px',
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
              onMouseEnter={() => setIsResetHovered(true)}
              onMouseLeave={() => setIsResetHovered(false)}
            >
              <RefreshCcw size={14} color={isResetHovered ? accentColor : '#6B7280'} />
            </IconButton>
          </Tooltip>
        </Box>
        
        <Box sx={{ mt: 2 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 700, 
              color: '#111827',
              fontSize: '1.25rem'
            }}
          >
            {value}
          </Typography>
          
          {trend !== 0 && (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mt: 1,
              color: trend > 0 ? '#10B981' : '#EF4444'
            }}>
              <TrendingUp 
                size={16} 
                style={{ 
                  transform: trend < 0 ? 'rotate(180deg)' : 'none',
                  marginRight: '4px'
                }} 
              />
              <Typography variant="caption">
                {Math.abs(trend)}% from last year
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

const ITRFinancialsContent: React.FC = () => {
  // State for the financials dropdown
  const [financialType, setFinancialType] = useState<string>("P&L");
  
  // State for managing columns
  const [columns, setColumns] = useState<string[]>(["Item", "FY 2022-23", "FY 2021-22"]);

  // Function to add a new column
  const addColumn = () => {
    // Generate a new year label based on the last one
    const lastYear = columns[columns.length - 1];
    if (lastYear.includes("FY")) {
      const match = lastYear.match(/FY (\d{4})-(\d{2})/);
      if (match) {
        const prevStartYear = parseInt(match[1], 10) - 1;
        const prevEndYear = parseInt(match[2], 10) - 1;
        const newYear = `FY ${prevStartYear}-${prevEndYear.toString().padStart(2, '0')}`;
        setColumns([...columns, newYear]);
      } else {
        setColumns([...columns, `FY ${new Date().getFullYear()-columns.length}-${(new Date().getFullYear()-columns.length+1).toString().slice(-2)}`]);
      }
    } else {
      setColumns([...columns, `Column ${columns.length + 1}`]);
    }
  };

  // Get the appropriate rows based on the selected financial type
  const getPLRows = () => [
    { id: 1, name: "Sales/Receipts" },
    { id: 2, name: "Other Income (Business Related)" },
    { id: 3, name: "Other Income (Non Business Related)" },
    { id: 4, name: "TOTAL INCOME", isBold: true },
    { id: 5, name: "COST OF Sales" },
    { id: 6, name: "Opening Stock" },
    // ... all other rows from your list ...
    { id: 38, name: "PAT (After Extraordinary Items)", isBold: true }
  ];

  const getBalanceSheetRows = () => [
    { id: 1, name: "Capital", section: "liabilities" },
    { id: 2, name: "Reserves and Surplus (excluding revaluation reserve)", section: "liabilities" },
    // ... all other liabilities rows ...
    { id: 18, name: "LIABILITIES - TOTAL", isBold: true, section: "liabilities" },
    { id: 19, name: "Gross Fixed Assets (Excl Plant and Machinery)", section: "assets" },
    // ... all other assets rows ...
    { id: 40, name: "ASSETS - TOTAL", isBold: true, section: "assets" }
  ];

  // Select the appropriate rows based on financial type
  const getRows = () => {
    switch(financialType) {
      case "P&L": 
        return getPLRows();
      case "Balance Sheet": 
        return getBalanceSheetRows();
      default:
        return [];
    }
  };

  // Handle dropdown change
  const handleFinancialTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFinancialType(event.target.value as string);
  };

  return (
    <Box>
      {/* Snapshots Section */}
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
        Snapshots
      </Typography>

      {/* Financial Cards will go here */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={2.4}>
          <FinancialCard 
            title="Revenue" 
            icon={<DollarSign size={16} color="#2563EB" />} 
            value="₹2.4 Cr" 
            trend={12} 
            accentColor="#2563EB"
          />
        </Grid>
        <Grid item xs={12} md={2.4}>
          <FinancialCard 
            title="EBITDA" 
            icon={<TrendingUp size={16} color="#10B981" />} 
            value="₹42 Lakhs" 
            trend={-3} 
            accentColor="#10B981"
          />
        </Grid>
        <Grid item xs={12} md={2.4}>
          <FinancialCard 
            title="Net Profit" 
            icon={<BarChart2 size={16} color="#8B5CF6" />} 
            value="₹18 Lakhs" 
            trend={8} 
            accentColor="#8B5CF6"
          />
        </Grid>
        <Grid item xs={12} md={2.4}>
          <FinancialCard 
            title="Assets" 
            icon={<BarChart2 size={16} color="#F97316" />} 
            value="₹3.8 Cr" 
            trend={5} 
            accentColor="#F97316"
          />
        </Grid>
        <Grid item xs={12} md={2.4}>
          <FinancialCard 
            title="Liabilities" 
            icon={<FileText size={16} color="#EC4899" />} 
            value="₹1.2 Cr" 
            trend={-2} 
            accentColor="#EC4899"
          />
        </Grid>
      </Grid>
      
      {/* Financials Section */}
      <Typography 
        variant="h6" 
        sx={{ 
          mt: 5,
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
        Financials
      </Typography>

      {/* Dropdown for financial statement type */}
      <FormControl sx={{ mb: 3, minWidth: 200 }}>
        <Select
          value={financialType}
          onChange={handleFinancialTypeChange}
          size="small"
          displayEmpty
          sx={{ 
            borderRadius: '8px',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#E5E7EB'
            }
          }}
        >
          <MenuItem value="P&L">P&L</MenuItem>
          <MenuItem value="Balance Sheet">Balance Sheet</MenuItem>
          <MenuItem value="Cash Flow">Cash Flow</MenuItem>
          <MenuItem value="GST">GST</MenuItem>
        </Select>
      </FormControl>

      {/* Datagrid for financial data */}
      <Paper 
        elevation={0} 
        sx={{ 
          mt: 2,
          borderRadius: '12px', 
          overflow: 'hidden',
          border: '1px solid #E5E7EB',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}
      >
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#F9FAFB' }}>
                {columns.map((column, index) => (
                  <TableCell 
                    key={column}
                    sx={{ 
                      fontWeight: 600, 
                      fontSize: '0.875rem',
                      color: '#111827',
                      width: index === 0 ? '40%' : `${60 / (columns.length - 1)}%`
                    }}
                  >
                    {index === 0 ? column : (
                      <FormControl fullWidth size="small">
                        <Select
                          value={column}
                          onChange={(e) => {
                            const newColumns = [...columns];
                            newColumns[index] = e.target.value as string;
                            setColumns(newColumns);
                          }}
                          sx={{ borderRadius: '6px', fontSize: '0.875rem' }}
                        >
                          <MenuItem value="FY 2022-23">FY 2022-23</MenuItem>
                          <MenuItem value="FY 2021-22">FY 2021-22</MenuItem>
                          <MenuItem value="FY 2020-21">FY 2020-21</MenuItem>
                          <MenuItem value="FY 2019-20">FY 2019-20</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  </TableCell>
                ))}
                <TableCell padding="checkbox">
                  <Tooltip title="Add year column">
                    <IconButton 
                      size="small" 
                      onClick={addColumn}
                      sx={{ 
                        color: '#2563EB',
                        '&:hover': {
                          backgroundColor: 'rgba(37, 99, 235, 0.04)'
                        }
                      }}
                    >
                      <Plus size={16} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getRows().map((row) => {
                // Check for section headers in balance sheet
                if (financialType === "Balance Sheet" && row.name === "Gross Fixed Assets (Excl Plant and Machinery)") {
                  return (
                    <React.Fragment key={row.id}>
                      <TableRow>
                        <TableCell 
                          colSpan={columns.length + 1} 
                          sx={{ 
                            backgroundColor: '#F3F4F6', 
                            fontWeight: 600,
                            color: '#4B5563',
                            fontSize: '0.875rem',
                            py: 1
                          }}
                        >
                          ASSETS
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell 
                          sx={{ 
                            pl: 3, 
                            fontWeight: row.isBold ? 600 : 400,
                            fontSize: '0.875rem'
                          }}
                        >
                          {row.name}
                        </TableCell>
                        {columns.slice(1).map((col, idx) => (
                          <TableCell key={idx}>
                            <input
                              type="text"
                              className="w-full px-2 py-1 border border-gray-200 rounded text-right"
                              placeholder="0.00"
                            />
                          </TableCell>
                        ))}
                        <TableCell></TableCell>
                      </TableRow>
                    </React.Fragment>
                  );
                }
                
                // Regular row
                return (
                  <TableRow key={row.id}>
                    <TableCell 
                      sx={{ 
                        pl: financialType === "Balance Sheet" && row.section === "assets" ? 3 : undefined,
                        fontWeight: row.isBold ? 600 : 400,
                        fontSize: '0.875rem'
                      }}
                    >
                      {row.name}
                    </TableCell>
                    {columns.slice(1).map((col, idx) => (
                      <TableCell key={idx}>
                        <input
                          type="text"
                          className="w-full px-2 py-1 border border-gray-200 rounded text-right"
                          placeholder="0.00"
                        />
                      </TableCell>
                    ))}
                    <TableCell></TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default ITRFinancialsContent;