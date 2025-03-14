import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AppContextType {
  isInCaseDetails: boolean;
  setIsInCaseDetails: (value: boolean) => void;
}

const defaultContext: AppContextType = {
  isInCaseDetails: false,
  setIsInCaseDetails: () => {},
};

export const AppContext = createContext<AppContextType>(defaultContext);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isInCaseDetails, setIsInCaseDetails] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        isInCaseDetails,
        setIsInCaseDetails,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for easy context consumption
export const useAppContext = () => useContext(AppContext);