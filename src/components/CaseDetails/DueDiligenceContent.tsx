import React from 'react';
import { Box } from '@mui/material';
import HistorySection from './HistorySection';
import SnapshotSection from './SnapshotSection'; // Re-import the SnapshotSection

const DueDiligenceContent: React.FC = () => {
  return (
    <Box className="space-y-8">
      <SnapshotSection /> {/* Add the SnapshotSection back */}
      <HistorySection />
    </Box>
  );
};

export default DueDiligenceContent;