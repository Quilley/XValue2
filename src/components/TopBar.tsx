import React, { useState } from 'react';
import { X, Bell, MessageSquare, Sun, Moon, FileText } from 'lucide-react';
import { Drawer, Box, Typography, IconButton, useTheme, Button, Skeleton } from '@mui/material';

interface TopBarProps {
  title?: string;
  subtitle?: string;
  onClose?: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ title, subtitle, onClose, isDarkMode, toggleDarkMode }) => {
  const [drawer, setDrawer] = useState<'notification' | 'message' | 'note' | null>(null);

  const handleDrawerToggle = (type: 'notification' | 'message' | 'note' | null) => {
    setDrawer(drawer === type ? null : type);
  };

  return (
    <>
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b py-4 px-6 flex justify-between items-center`}>
        <div>
          {title && <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h1>}
          {subtitle && <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{subtitle}</p>}
        </div>
        
        <div className="flex space-x-4 items-center">
          {/* Dark/Light Mode Toggle */}
          <button 
            className={`p-2 rounded-full hover:${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
            onClick={toggleDarkMode}
          >
            {isDarkMode ? (
              <Sun size={20} className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} />
            ) : (
              <Moon size={20} className="text-gray-600" />
            )}
          </button>
          
          {/* Bell Icon */}
          <button 
            className={`p-2 rounded-full hover:${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
            onClick={() => handleDrawerToggle('notification')}
          >
            <Bell size={20} className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} />
          </button>
          
          {/* Messages Icon */}
          <button 
            className={`p-2 rounded-full hover:${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
            onClick={() => handleDrawerToggle('message')}
          >
            <MessageSquare size={20} className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} />
          </button>
          
          {/* CM Note Icon */}
          <button 
            className={`p-2 rounded-full hover:${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
            onClick={() => handleDrawerToggle('note')}
          >
            <FileText size={20} className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} />
          </button>
          
          {/* Close Button (if onClose provided) */}
          {onClose && (
            <button 
              onClick={onClose}
              className={`ml-4 p-2 rounded-full hover:${isDarkMode ? 'bg-red-900' : 'bg-red-100'}`}
            >
              <X size={20} className="text-red-600" />
            </button>
          )}
        </div>
      </div>

      {/* Drawer for notifications, messages, and notes */}
      <Drawer
        anchor="right"
        open={drawer !== null}
        onClose={() => setDrawer(null)}
        sx={{
          '& .MuiDrawer-paper': { 
            width: '400px',
            backgroundColor: isDarkMode ? '#1f2937' : '#fff',
            color: isDarkMode ? '#fff' : 'inherit'
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ color: isDarkMode ? '#fff' : 'inherit' }}>
              {drawer === 'notification' && 'Notifications'}
              {drawer === 'message' && 'Messages'}
              {drawer === 'note' && 'CM Notes'}
            </Typography>
            <IconButton onClick={() => setDrawer(null)} sx={{ color: isDarkMode ? '#fff' : 'inherit' }}>
              <X size={20} />
            </IconButton>
          </Box>

          {/* Skeleton loading for content */}
          <Box sx={{ mt: 2 }}>
            {Array(5).fill(0).map((_, i) => (
              <Box key={i} sx={{ mb: 2 }}>
                <Skeleton variant="text" width="60%" height={30} sx={{ bgcolor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }} />
                <Skeleton variant="rectangular" height={60} sx={{ mt: 1, bgcolor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }} />
              </Box>
            ))}
          </Box>

          {/* Add button for Messages and Notes */}
          {(drawer === 'message' || drawer === 'note') && (
            <Box sx={{ position: 'absolute', bottom: 16, right: 16 }}>
              <Button 
                variant="contained" 
                color="primary"
                sx={{
                  borderRadius: '20px',
                  textTransform: 'none',
                  backgroundColor: '#2563EB'
                }}
              >
                Create New {drawer === 'message' ? 'Message' : 'Note'}
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default TopBar;