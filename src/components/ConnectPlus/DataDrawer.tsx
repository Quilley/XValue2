import React from 'react';
import { 
  Box, 
  Drawer, 
  Typography, 
  IconButton, 
  Tooltip,
  Paper,
  Card,
  CardContent,
  Button
} from '@mui/material';
import { Database, ChevronLeft, Upload, Eye, FileText, File } from 'lucide-react';

interface DataDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchDrawer: () => void;
  activeCaseId?: string;
  activeCaseName?: string;
}

interface DataFile {
  id: string;
  type: string;
  name: string;
  lastUpdated: string;
  size: string;
}

const DataDrawer: React.FC<DataDrawerProps> = ({ 
  isOpen, 
  onClose, 
  onSwitchDrawer,
  activeCaseId,
  activeCaseName
}) => {
  // Check if we have an active case
  const hasActiveCase = !!activeCaseId;
  
  // Rainbow gradient for ConnectPlus reference
  const rainbowGradient = 'linear-gradient(135deg, #FF5858 0%, #F09819 20%, #85FFBD 40%, #4158D0 60%, #C850C0 80%, #FF5858 100%)';
  
  // Sample data files - you would get these from API based on the case ID
  const dataFiles: Record<string, DataFile[]> = {
    'kyc': [
      { id: '1', type: 'kyc', name: 'Customer_KYC.pdf', lastUpdated: '2023-12-01', size: '1.2 MB' },
    ],
    'bank': [
      { id: '2', type: 'bank', name: 'Bank_Statement_Q1.pdf', lastUpdated: '2023-11-15', size: '3.5 MB' },
      { id: '3', type: 'bank', name: 'Bank_Statement_Q2.pdf', lastUpdated: '2023-11-15', size: '2.8 MB' },
    ],
    'itr': [
      { id: '4', type: 'itr', name: 'ITR_FY22_23.pdf', lastUpdated: '2023-10-30', size: '1.8 MB' },
    ],
    'financial': [
      { id: '5', type: 'financial', name: 'Balance_Sheet_FY22.xlsx', lastUpdated: '2023-10-22', size: '420 KB' },
      { id: '6', type: 'financial', name: 'P&L_Statement_FY22.xlsx', lastUpdated: '2023-10-22', size: '380 KB' },
    ],
    'property': [
      { id: '7', type: 'property', name: 'Property_Deed.pdf', lastUpdated: '2023-09-15', size: '5.2 MB' },
    ],
    'pd': [
      { id: '8', type: 'pd', name: 'PD_Report.pdf', lastUpdated: '2023-11-28', size: '850 KB' },
    ]
  };

  const fileCategories = [
    { id: 'kyc', label: 'KYC Documents', color: '#2563EB', icon: <FileText size={16} /> },
    { id: 'bank', label: 'Bank Statements', color: '#10B981', icon: <FileText size={16} /> },
    { id: 'itr', label: 'ITR Documents', color: '#F59E0B', icon: <FileText size={16} /> },
    { id: 'financial', label: 'Financial Statements', color: '#8B5CF6', icon: <FileText size={16} /> },
    { id: 'property', label: 'Property Documents', color: '#EF4444', icon: <FileText size={16} /> },
    { id: 'pd', label: 'PD Reports', color: '#EC4899', icon: <FileText size={16} /> },
  ];

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      variant="persistent"
      sx={{
        '& .MuiDrawer-paper': {
          width: 340,
          boxSizing: 'border-box',
          boxShadow: '-4px 0 20px rgba(0,0,0,0.15)',
          backgroundColor: '#ffffff',
          color: '#111827',
          borderLeft: '1px solid #E5E7EB',
        },
        zIndex: 1000,
      }}
    >
      <Box sx={{ 
        padding: '16px 24px',
        height: '100%',
        backgroundColor: '#FFFFFF'
      }}>
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          mb: 3,
          pb: 2,
          borderBottom: '1px solid #E5E7EB'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box 
              sx={{ 
                backgroundColor: '#2563EB',
                borderRadius: '8px',
                padding: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <FileText size={18} color="#fff" />
            </Box>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 'bold',
                color: '#2563EB'
              }}
            >
              Data
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="Switch to Connect+ Drawer">
              <IconButton 
                size="small"
                onClick={onSwitchDrawer}
                sx={{ 
                  backgroundColor: 'rgba(0,0,0,0.05)', 
                  '&:hover': { backgroundColor: 'rgba(0,0,0,0.1)' },
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  paddingRight: 1
                }}
              >
                <Database size={16} color="#171717" />
                <Typography variant="caption" sx={{ 
                  color: '#171717', 
                  fontWeight: 500,
                  background: rainbowGradient,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  Connect+
                </Typography>
              </IconButton>
            </Tooltip>
            <IconButton 
              onClick={onClose} 
              size="small"
              sx={{ 
                color: '#111827', 
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' } 
              }}
            >
              <ChevronLeft size={20} />
            </IconButton>
          </Box>
        </Box>

        {/* Case Information */}
        {hasActiveCase ? (
          <Paper
            elevation={0}
            sx={{
              p: 2,
              mb: 3,
              backgroundColor: 'rgba(37, 99, 235, 0.07)',
              border: '1px solid rgba(37, 99, 235, 0.2)',
              borderRadius: '8px',
            }}
          >
            <Typography variant="subtitle2" sx={{ color: '#2563EB', fontWeight: 600 }} gutterBottom>
              Active Case
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
              {activeCaseName || 'Case #' + activeCaseId}
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(17, 24, 39, 0.7)' }}>
              ID: {activeCaseId}
            </Typography>
          </Paper>
        ) : (
          <Paper
            elevation={0}
            sx={{
              p: 2,
              mb: 3,
              backgroundColor: 'rgba(229, 231, 235, 0.3)',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              textAlign: 'center'
            }}
          >
            <Typography variant="subtitle2" sx={{ color: '#6B7280' }} gutterBottom>
              No Active Case
            </Typography>
            <Typography variant="body2" sx={{ color: '#9CA3AF' }}>
              Open a case to view specific documents
            </Typography>
          </Paper>
        )}

        {/* File Category Cards */}
        <Box sx={{ mt: 3, opacity: hasActiveCase ? 1 : 0.6 }}>
          {fileCategories.map((category) => (
            <Card 
              key={category.id} 
              sx={{ 
                mb: 2, 
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  borderColor: category.color,
                },
                transition: 'all 0.3s ease'
              }}
            >
              <CardContent sx={{ p: '12px 16px' }}>  {/* Reduced padding for more compact cards */}
                {/* Category Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box 
                      sx={{ 
                        backgroundColor: `${category.color}15`,
                        borderRadius: '6px',
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {React.cloneElement(category.icon, { color: category.color })}
                    </Box>
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        fontWeight: 600, 
                        fontSize: '0.85rem',
                        color: '#111827'
                      }}
                    >
                      {category.label}
                    </Typography>
                  </Box>
                  
                  {/* Upload button */}
                  <IconButton 
                    size="small" 
                    disabled={!hasActiveCase}
                    sx={{ 
                      backgroundColor: hasActiveCase ? `${category.color}10` : 'transparent',
                      width: '24px', 
                      height: '24px',
                      '&:hover': {
                        backgroundColor: hasActiveCase ? `${category.color}20` : 'transparent',
                      }
                    }}
                  >
                    <Upload 
                      size={14} 
                      color={hasActiveCase ? category.color : '#9CA3AF'} 
                    />
                  </IconButton>
                </Box>
                
                {/* Files list */}
                <Box sx={{ mt: 1 }}>
                  {dataFiles[category.id] && dataFiles[category.id].length > 0 ? (
                    dataFiles[category.id].map((file) => (
                      <Box 
                        key={file.id} 
                        sx={{ 
                          py: 0.75, 
                          px: 1, 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          borderRadius: '4px',
                          '&:hover': {
                            backgroundColor: 'rgba(0,0,0,0.02)'
                          }
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <File size={14} color="#6B7280" />
                          <Box>
                            <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                              {file.name}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#6B7280', fontSize: '0.7rem' }}>
                              {file.size} • {file.lastUpdated}
                            </Typography>
                          </Box>
                        </Box>
                        
                        <IconButton 
                          size="small"
                          disabled={!hasActiveCase}
                          sx={{ 
                            width: '20px', 
                            height: '20px'
                          }}
                        >
                          <Eye size={14} color={hasActiveCase ? "#6B7280" : "#D1D5DB"} />
                        </IconButton>
                      </Box>
                    ))
                  ) : (
                    <Box sx={{ 
                      py: 1, 
                      textAlign: 'center',
                      color: '#9CA3AF',
                      fontSize: '0.75rem'
                    }}>
                      No files uploaded
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Background pattern */}
        <Box 
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '100%',
            backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(229, 231, 235, 0.3) 2%, transparent 0%)',
            backgroundSize: '50px 50px',
            opacity: 0.3,
            pointerEvents: 'none',
            zIndex: -1
          }}
        />
      </Box>
    </Drawer>
  );
};

export default DataDrawer;