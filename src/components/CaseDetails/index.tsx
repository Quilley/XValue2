import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CustomerCase } from '../../types';
import CaseDetailsStepper, { StepCompletionStatus } from './Stepper';
import CaseDetailsTopBar from './TopBar';
import CaseDetailsContent from './ContentContent';

interface CaseDetailsProps {
  customerCase: CustomerCase;
  onClose: () => void;
}

const CaseDetails: React.FC<CaseDetailsProps> = ({ customerCase, onClose }) => {
  const steps = ["Overview", "Reco Note", "Banking", "RTR", "Bureau", "ITR", "GST", "Financials", "Misc", "Review & Submit"];
  const [activeStep, setActiveStep] = useState<number>(0);
  
  // Mock data for step completion - in a real implementation, this would be derived 
  // from form data and validation logic
  const [stepStatus, setStepStatus] = useState<StepCompletionStatus[]>([
    'complete',           // Overview - fully completed
    'partially-complete', // Reco Note - partially completed
    'partially-complete', // Banking - partially completed
    'not-started',        // RTR
    'not-started',        // Bureau
    'not-started',        // ITR
    'not-started',        // GST
    'not-started',        // Financials
    'not-started',        // Misc
    'not-started'         // Review & Submit
  ]);
  
  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
      
      // Example of updating step status when moving to next step
      // This is just a simulation - in a real app, this would be based on form validation
      if (stepStatus[activeStep] === 'not-started') {
        const newStatus = [...stepStatus];
        newStatus[activeStep] = 'partially-complete';
        setStepStatus(newStatus);
      }
    }
  };
  
  const handlePrevious = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };
  
  const handleStepClick = (step: number) => {
    setActiveStep(step);
  };

  return (
    <motion.div
      className="fixed inset-0 bg-white z-50 overflow-auto"
      initial={{ opacity: 0, rotateY: -90 }}
      animate={{ opacity: 1, rotateY: 0 }}
      exit={{ opacity: 0, rotateY: 90 }}
      transition={{ duration: 0.5 }}
      style={{ marginLeft: '80px', width: 'calc(100% - 80px)' }}
    >
      <div className="h-full flex flex-col">
        {/* Top Bar with navigation icons */}
        <CaseDetailsTopBar 
          customerCase={customerCase}
          onClose={onClose}
        />
        
        {/* Enhanced Stepper Navigation */}
        <CaseDetailsStepper
          steps={steps}
          activeStep={activeStep}
          onStepClick={handleStepClick}
          completionStatus={stepStatus}
        />
        
        {/* Main Content Area */}
        <div className="flex-1 p-6 overflow-auto bg-gray-50">
          <CaseDetailsContent 
            activeStep={activeStep} 
            customerCase={customerCase} 
          />
          
          {/* Bottom Navigation */}
          <div className="mt-10 flex justify-end">
            {activeStep > 0 && (
              <button 
                onClick={handlePrevious}
                className="px-6 py-2 mr-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Previous
              </button>
            )}
            
            {activeStep < steps.length - 1 ? (
              <button 
                onClick={handleNext}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Next
              </button>
            ) : (
              <button 
                onClick={() => {/* Submit logic */}}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Review & Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CaseDetails;