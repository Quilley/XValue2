import React from 'react';
import { CustomerCase } from '../../types';
import TopBar from '../TopBar';
import { useDarkMode } from '../../App';

interface CaseDetailsTopBarProps {
  customerCase: CustomerCase;
  onClose: () => void;
}

const CaseDetailsTopBar: React.FC<CaseDetailsTopBarProps> = ({ customerCase, onClose }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <TopBar
      title={customerCase.customerName}
      subtitle={`Case ID: ${customerCase.id}`}
      onClose={onClose}
      isDarkMode={isDarkMode}
      toggleDarkMode={toggleDarkMode}
    />
  );
};

export default CaseDetailsTopBar;