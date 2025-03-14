import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, FileText, Users, Settings } from 'lucide-react';

const menuItems = [
  { path: '/', icon: <Home size={24} />, label: 'Dashboard' },
  { path: '/cet', icon: <FileText size={24} />, label: 'CET' },
  { path: '/customers', icon: <Users size={24} />, label: 'Customers' },
  { path: '/settings', icon: <Settings size={24} />, label: 'Settings' },
];

interface SidebarProps {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isExpanded, setIsExpanded }) => {
  return (
    <motion.div
      initial={{ width: 80 }}
      animate={{ width: isExpanded ? 280 : 80 }}
      transition={{ duration: 0.3 }}
      className="h-screen bg-gray-900 text-white fixed left-0 top-0 z-[1000] shadow-xl"
      style={{ boxShadow: '0 0 20px rgba(0,0,0,0.2)' }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex items-center justify-between p-4">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: isExpanded ? 1 : 0 }}
          className="text-2xl font-semibold truncate"
        >
          Credit System
        </motion.h1>
      </div>

      <nav className="mt-8">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 ${
                isActive ? 'bg-blue-600' : 'hover:bg-gray-800'
              } transition-colors`
            }
          >
            <span className="text-xl flex justify-center items-center">
              {item.icon}
            </span>
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ 
                opacity: isExpanded ? 1 : 0,
                width: isExpanded ? 'auto' : 0 
              }}
              className="ml-4 text-lg truncate"
            >
              {item.label}
            </motion.span>
          </NavLink>
        ))}
      </nav>
    </motion.div>
  );
};

export default Sidebar;