import React from 'react';
import { CustomerCase } from '../../types';
import OverviewContent from './OverviewContent';
import { useDarkMode } from '../../App'; // Add this import

interface ContentProps {
  activeStep: number;
  customerCase: CustomerCase;
}

const CaseDetailsContent: React.FC<ContentProps> = ({ activeStep, customerCase }) => {
  const { isDarkMode } = useDarkMode(); // Get dark mode state
  
  const steps = [
    "Overview", 
    "Reco Note", 
    "Banking", 
    "RTR", 
    "Bureau", 
    "ITR", 
    "GST", 
    "Financials", 
    "Misc", 
    "Review & Submit"
  ];
  
  // Render the appropriate content based on active step
  const renderContent = () => {
    switch (activeStep) {
      case 0: // Overview
        return <OverviewContent loanTenureMonths={48} />;
        
      default:
        return renderSkeletonLayout();
    }
  };
  
  // Updated to use isDarkMode
  const renderSkeletonLayout = () => {
    switch (activeStep) {
      case 1: // Reco Note
        return (
          <div className="space-y-6">
            <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg h-40 animate-pulse`}></div>
            <div className="grid grid-cols-2 gap-6">
              <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg h-60 animate-pulse`}></div>
              <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg h-60 animate-pulse`}></div>
            </div>
            <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg h-32 animate-pulse`}></div>
          </div>
        );
        
      default:
        return (
          <div className="space-y-6">
            <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg h-40 animate-pulse`}></div>
            <div className="grid grid-cols-2 gap-6">
              <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg h-64 animate-pulse`}></div>
              <div className="space-y-6">
                <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg h-28 animate-pulse`}></div>
                <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg h-28 animate-pulse`}></div>
              </div>
            </div>
          </div>
        );
    }
  };
  
  return (
    <div className={isDarkMode ? 'text-white' : 'text-gray-800'}>
      <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-6`}>
        {steps[activeStep]}
      </h2>
      
      {renderContent()}
    </div>
  );
};

export default CaseDetailsContent;