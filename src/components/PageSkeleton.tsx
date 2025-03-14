import React from 'react';
import { Box, Skeleton, Typography } from '@mui/material';
import TopBar from './TopBar';

interface PageSkeletonProps {
  title: string;
}

const PageSkeleton: React.FC<PageSkeletonProps> = ({ title }) => {
  return (
    <div className="bg-gray-100">
      <TopBar title={title} />
      
      <div className="p-6">
        <Box sx={{ width: '100%', mb: 4 }}>
          <Skeleton variant="rectangular" height={50} />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {[1, 2, 3, 4].map((item) => (
            <Skeleton 
              key={item}
              variant="rectangular" 
              height={120} 
              sx={{ borderRadius: 2 }} 
            />
          ))}
        </Box>
      </div>
    </div>
  );
};

export default PageSkeleton;