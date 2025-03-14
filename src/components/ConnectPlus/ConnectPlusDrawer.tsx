import React, { useState } from 'react';
import { Box, Drawer, Typography, IconButton, Tooltip, Paper } from '@mui/material';
import { Database, ChevronLeft, FileText } from 'lucide-react';

interface ConnectPlusDrawerProps {
  isOpen: boolean; 
  onClose: () => void;
  onSwitchDrawer: () => void;
  activeCaseId?: string;
  activeCaseName?: string;
}

interface DataSourceRow {
  id: string;
  name: string;
  description: string;
  isConnected: boolean;
  fileFormat: 'json' | 'pdf';
}

const ConnectPlusDrawer: React.FC<ConnectPlusDrawerProps> = ({ 
  isOpen, 
  onClose, 
  onSwitchDrawer,
  activeCaseId,
  activeCaseName
}) => {
  const [dataSources, setDataSources] = useState<DataSourceRow[]>([
    { id: '1', name: 'CIBIL Bureau', description: 'Credit Information Bureau India Limited', isConnected: false, fileFormat: 'json' },
    { id: '2', name: 'Experian', description: 'Credit reporting and marketing services', isConnected: false, fileFormat: 'pdf' },
    { id: '3', name: 'CRIF High Mark', description: 'Credit information services', isConnected: false, fileFormat: 'json' },
    { id: '4', name: 'Income Tax Department', description: 'Government income tax records', isConnected: false, fileFormat: 'pdf' },
    { id: '5', name: 'GST Network', description: 'Goods and Services Tax Network', isConnected: false, fileFormat: 'json' },
    { id: '6', name: 'Bank Statement', description: 'Banking transaction data', isConnected: false, fileFormat: 'pdf' }
  ]);

  const toggleConnection = (id: string) => {
    setDataSources(
      dataSources.map(source => 
        source.id === id ? { ...source, isConnected: !source.isConnected } : source
      )
    );
  };

  const toggleFileFormat = (id: string) => {
    setDataSources(
      dataSources.map(source => 
        source.id === id ? { ...source, fileFormat: source.fileFormat === 'json' ? 'pdf' : 'json' } : source
      )
    );
  };

  // Create a rainbow gradient for the ConnectPlus icon
  const rainbowGradient = 'linear-gradient(135deg, #FF5858 0%, #F09819 20%, #85FFBD 40%, #4158D0 60%, #C850C0 80%, #FF5858 100%)';

  // Check if we have an active case
  const hasActiveCase = !!activeCaseId;

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
          boxShadow: '-4px 0 20px rgba(0,0,0,0.3)',
          backgroundColor: '#171717',
          color: '#fff',
          borderLeft: '1px solid #333333',
        },
        zIndex: 1000,
      }}
    >
      <Box sx={{ 
        padding: '16px 24px',
        background: 'linear-gradient(to bottom, #171717, #262626)',
        height: '100%'
      }}>
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          mb: 3,
          pb: 2,
          borderBottom: '1px solid #333333'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box 
              sx={{ 
                background: rainbowGradient,
                borderRadius: '8px',
                padding: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 15px rgba(255, 255, 255, 0.2)'
              }}
            >
              <Database size={18} color="#fff" />
            </Box>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 'bold',
                background: rainbowGradient,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.3))'
              }}
            >
              Connect+
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="Switch to Data Drawer">
              <IconButton 
                size="small"
                onClick={onSwitchDrawer}
                sx={{ 
                  backgroundColor: 'rgba(255,255,255,0.1)', 
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' },
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  paddingRight: 1
                }}
              >
                <FileText size={16} color="#2563EB" />
                <Typography variant="caption" sx={{ color: '#2563EB', fontWeight: 500 }}>
                  Data
                </Typography>
              </IconButton>
            </Tooltip>
            <IconButton 
              onClick={onClose} 
              size="small"
              sx={{ 
                color: '#fff', 
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } 
              }}
            >
              <ChevronLeft size={20} />
            </IconButton>
          </Box>
        </Box>

        {/* Case Information - Add this section */}
        {hasActiveCase ? (
          <Paper
            elevation={0}
            sx={{
              p: 2,
              mb: 3,
              backgroundColor: 'rgba(56, 189, 248, 0.1)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              borderRadius: '8px',
            }}
          >
            <Typography variant="subtitle2" sx={{ color: '#0EA5E9', fontWeight: 600 }} gutterBottom>
              Active Case
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem', color: '#fff' }}>
              {activeCaseName || 'Case #' + activeCaseId}
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              ID: {activeCaseId}
            </Typography>
          </Paper>
        ) : (
          <Paper
            elevation={0}
            sx={{
              p: 2,
              mb: 3,
              backgroundColor: 'rgba(30, 30, 30, 0.5)',
              border: '1px solid #333333',
              borderRadius: '8px',
              textAlign: 'center'
            }}
          >
            <Typography variant="subtitle2" sx={{ color: '#9ca3af' }} gutterBottom>
              No Active Case
            </Typography>
            <Typography variant="body2" sx={{ color: '#6b7280' }}>
              Open a case to view specific data connections
            </Typography>
          </Paper>
        )}

        {/* Content */}
        <Typography 
          variant="subtitle1" 
          sx={{ 
            mb: 2, 
            color: '#9ca3af',
            textShadow: '0 0 8px rgba(255,255,255,0.1)'
          }}
        >
          Connect to data sources
        </Typography>

        {/* Add a subtle background pattern */}
        <Box 
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '100%',
            backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(75, 75, 75, 0.2) 2%, transparent 0%)',
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

export default ConnectPlusDrawer;