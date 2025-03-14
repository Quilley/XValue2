import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from './components/Sidebar';
import CETPage from './pages/CET';

// Create dark mode context
export const DarkModeContext = createContext({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

export const useDarkMode = () => useContext(DarkModeContext);

function App() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  // Create theme based on dark mode state
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      background: {
        default: isDarkMode ? '#121212' : '#f3f4f6',
        paper: isDarkMode ? '#1e1e1e' : '#ffffff',
      },
    },
  });
  
  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div className="flex">
            <Sidebar 
              isExpanded={sidebarExpanded} 
              setIsExpanded={setSidebarExpanded} 
            />
            <main 
              className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} min-h-screen transition-all duration-300`}
              style={{ marginLeft: '80px', width: 'calc(100% - 80px)' }}
            >
              <Routes>
                <Route path="/cet" element={<CETPage />} />
                <Route path="/" element={<div className={`p-6 ${isDarkMode ? 'text-white' : ''}`}><h1 className="text-3xl font-bold">Dashboard</h1></div>} />
                <Route path="/customers" element={<div className={`p-6 ${isDarkMode ? 'text-white' : ''}`}><h1 className="text-3xl font-bold">Customers</h1></div>} />
                <Route path="/settings" element={<div className={`p-6 ${isDarkMode ? 'text-white' : ''}`}><h1 className="text-3xl font-bold">Settings</h1></div>} />
              </Routes>
            </main>
          </div>
        </Router>
      </ThemeProvider>
    </DarkModeContext.Provider>
  );
}

export default App;