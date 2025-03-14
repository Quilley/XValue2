import React, { useState } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { Database, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import ConnectPlusDrawer from './ConnectPlusDrawer';
import DataDrawer from './DataDrawer';

interface DrawerControllerProps {
  activeCaseId?: string;
  activeCaseName?: string;
}

const DrawerController: React.FC<DrawerControllerProps> = ({ 
  activeCaseId, 
  activeCaseName 
}) => {
  const [activeDrawer, setActiveDrawer] = useState<'data' | 'connect' | null>(null);
  
  const toggleDrawer = (drawer: 'data' | 'connect') => {
    if (activeDrawer === drawer) {
      setActiveDrawer(null);
    } else {
      setActiveDrawer(drawer);
    }
  };
  
  const closeDrawers = () => {
    setActiveDrawer(null);
  };
  
  const switchDrawer = () => {
    setActiveDrawer(activeDrawer === 'data' ? 'connect' : 'data');
  };

  // Create a rainbow gradient for the ConnectPlus icon
  const rainbowGradient = 'linear-gradient(135deg, #FF5858 0%, #F09819 20%, #85FFBD 40%, #4158D0 60%, #C850C0 80%, #FF5858 100%)';
  
  return (
    <>
      {/* Data Toggle Button */}
      <motion.div
        className="fixed right-0 top-1/2 transform -translate-y-1/2 z-[1001]"
        style={{ marginTop: -80 }} // Moving it up to create separation
        initial={{ x: 0 }}
        animate={{ x: activeDrawer === 'data' ? -340 : 0 }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <Box
          onClick={() => toggleDrawer('data')}
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#2563EB',
            border: '1px solid #1E40AF',
            borderRight: 'none',
            borderTopLeftRadius: '10px',
            borderBottomLeftRadius: '10px',
            boxShadow: '-2px 0 10px rgba(37, 99, 235, 0.3)',
            padding: '14px 10px',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: '#1D4ED8',
              boxShadow: '-3px 0 15px rgba(37, 99, 235, 0.4)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1
          }}>
            <Box 
              sx={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <FileText size={20} color="#ffffff" />
            </Box>
            <Box
              sx={{ 
                writingMode: 'vertical-lr',
                transform: 'rotate(180deg)',
                fontWeight: 'bold',
                fontSize: '0.7rem',
                color: '#ffffff'
              }}
            >
              Data
            </Box>
          </Box>
        </Box>
      </motion.div>

      {/* Connect+ Toggle Button - adjusted position */}
      <motion.div
        className="fixed right-0 top-1/2 transform -translate-y-1/2 z-[1001]"
        style={{ marginTop: 20 }} // Moving it down to create separation
        initial={{ x: 0 }}
        animate={{ x: activeDrawer === 'connect' ? -340 : 0 }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <Box
          onClick={() => toggleDrawer('connect')}
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#171717',
            border: '1px solid #333333',
            borderRight: 'none',
            borderTopLeftRadius: '10px',
            borderBottomLeftRadius: '10px',
            boxShadow: '-4px 0 15px rgba(0, 0, 0, 0.3)',
            padding: '14px 10px',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: '#262626',
              boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.5)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1
          }}>
            <Box 
              sx={{ 
                background: rainbowGradient,
                borderRadius: '8px',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 15px rgba(255, 255, 255, 0.2)'
              }}
            >
              <Database size={20} color="#fff" />
            </Box>
            <Box
              sx={{ 
                writingMode: 'vertical-lr',
                transform: 'rotate(180deg)',
                fontWeight: 'bold',
                fontSize: '0.7rem',
                color: '#fff',
                background: rainbowGradient,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.3))'
              }}
            >
              Connect+
            </Box>
          </Box>
        </Box>
      </motion.div>

      {/* Render both drawers with their appropriate states */}
      <ConnectPlusDrawer 
        isOpen={activeDrawer === 'connect'} 
        onClose={closeDrawers} 
        onSwitchDrawer={switchDrawer}
        activeCaseId={activeCaseId}
        activeCaseName={activeCaseName}
      />
      <DataDrawer 
        isOpen={activeDrawer === 'data'} 
        onClose={closeDrawers}
        onSwitchDrawer={switchDrawer}
        activeCaseId={activeCaseId}
        activeCaseName={activeCaseName}
      />
    </>
  );
};

export default DrawerController;