import React from 'react';
import { Check } from 'lucide-react';

interface StepperProps {
  steps: string[];
  activeStep: number;
  onStepClick: (step: number) => void;
  completionStatus?: StepCompletionStatus[]; // Added to track field completion
}

// New type to track step completion status
export type StepCompletionStatus = 'not-started' | 'partially-complete' | 'complete';

const CaseDetailsStepper: React.FC<StepperProps> = ({ 
  steps, 
  activeStep, 
  onStepClick,
  completionStatus // This would come from parent component
}) => {
  // Default completion status if not provided
  const stepStatus = completionStatus || steps.map(() => 'not-started' as StepCompletionStatus);
  
  return (
    <div className="w-full bg-white border-b border-gray-200 px-6 pt-6 pb-4 overflow-x-auto">
      <div className="flex" style={{ minWidth: `${steps.length * 100}px` }}>
        {steps.map((step, index) => {
          // Determine the status of this step
          const isCompleted = stepStatus[index] === 'complete';
          const isPartial = stepStatus[index] === 'partially-complete';
          const isCurrent = index === activeStep;
          
          // Determine appropriate colors based on status
          let bgColor = 'bg-gray-200';
          let textColor = 'text-gray-700';
          let connectorColor = 'bg-gray-200';
          let labelColor = 'text-gray-500';
          
          if (isCompleted) {
            bgColor = 'bg-green-600';
            textColor = 'text-white';
            connectorColor = 'bg-green-600';
            labelColor = 'text-green-600';
          } else if (isPartial) {
            bgColor = 'bg-amber-500';
            textColor = 'text-white';
            connectorColor = 'bg-amber-300';
            labelColor = 'text-amber-600';
          } else if (isCurrent) {
            bgColor = 'bg-blue-600';
            textColor = 'text-white';
            labelColor = 'text-blue-600';
          }
          
          return (
            <div 
              key={step} 
              className="flex-1 relative flex flex-col items-center"
              onClick={() => onStepClick(index)}
            >
              {/* Step circle - now centered */}
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer ${bgColor} ${textColor}`}
              >
                {isCompleted ? (
                  <Check size={18} />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              
              {/* Step label - now below the circle */}
              <span 
                className={`mt-2 text-xs font-medium cursor-pointer text-center ${labelColor}`}
                style={{ maxWidth: '90px' }}
              >
                {step}
              </span>
              
              {/* Connector line - adjusted for centered layout */}
              {index < steps.length - 1 && (
                <div 
                  className={`absolute top-5 left-[55%] right-0 h-0.5 -translate-y-1/2 ${connectorColor}`}
                  style={{ width: 'calc(100% - 20px)' }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CaseDetailsStepper;