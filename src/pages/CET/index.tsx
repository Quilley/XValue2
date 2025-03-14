import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import CaseCard from '../../components/CaseCard';
import CaseDetails from '../../components/CaseDetails';
import { CustomerCase } from '../../types';
import TopBar from '../../components/TopBar';
import { useDarkMode } from '../../App';

const mockCases: CustomerCase[] = [
  {
    id: 'CAS001',
    customerName: 'John Doe',
    loanAmount: 500000,
    status: 'assigned',
    details: {
      basics: {
        name: 'John Doe',
        age: 35,
        occupation: 'Software Engineer',
        annualIncome: 1200000
      },
      banking: {
        accountNumber: '1234567890',
        bankName: 'State Bank',
        averageBalance: 100000,
        transactions: []
      },
      bureau: {
        creditScore: 750,
        outstandingLoans: 0,
        paymentHistory: []
      },
      financials: {
        monthlyIncome: 100000,
        monthlyExpenses: 40000,
        assets: [],
        liabilities: []
      },
      pdDetails: {
        probabilityOfDefault: 0.05,
        riskScore: 85,
        riskCategory: 'Low Risk'
      },
      additional: {
        comments: '',
        documents: []
      }
    }
  },
  // Add more mock cases as needed
];

const CETPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedCase, setSelectedCase] = useState<CustomerCase | null>(null);
  const [showCaseDetails, setShowCaseDetails] = useState<boolean>(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleCaseClick = (customerCase: CustomerCase) => {
    setSelectedCase(customerCase);
    setShowCaseDetails(true);
  };
  
  const handleCloseDetails = () => {
    setShowCaseDetails(false);
  };

  const filterCases = (status: 'assigned' | 'draft' | 'submitted') => {
    return mockCases.filter(c => c.status === status);
  };

  return (
    <div className={isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'}>
      <TopBar 
        title="Credit Evaluation Tool" 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode}
      />
      
      <div className="p-6">
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Assigned" />
            <Tab label="Drafts" />
            <Tab label="Submitted" />
          </Tabs>
        </Box>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="w-full flex flex-col items-start pl-6"
          >
            {activeTab === 0 && filterCases('assigned').map(customerCase => (
              <CaseCard
                key={customerCase.id}
                case={customerCase}
                onClick={() => handleCaseClick(customerCase)}
              />
            ))}
            {activeTab === 1 && filterCases('draft').map(customerCase => (
              <CaseCard
                key={customerCase.id}
                case={customerCase}
                onClick={() => handleCaseClick(customerCase)}
              />
            ))}
            {activeTab === 2 && filterCases('submitted').map(customerCase => (
              <CaseCard
                key={customerCase.id}
                case={customerCase}
                onClick={() => handleCaseClick(customerCase)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
        
        <AnimatePresence>
          {showCaseDetails && selectedCase && (
            <CaseDetails 
              customerCase={selectedCase} 
              onClose={handleCloseDetails}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CETPage;