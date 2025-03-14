import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Clock, Users, Info } from 'lucide-react';
import { CustomerCase } from '../types';
import { useDarkMode } from '../App';

// User type for reassignment
interface User {
  id: string;
  name: string;
  designation: string;
  initials: string;
}

// Mock users data
const users: User[] = [
  { id: '1', name: 'John Doe', designation: 'Credit Officer', initials: 'JD' },
  { id: '2', name: 'Emily Smith', designation: 'Senior Analyst', initials: 'ES' },
  { id: '3', name: 'Robert Chen', designation: 'Manager', initials: 'RC' },
  { id: '4', name: 'Sarah Johnson', designation: 'Director', initials: 'SJ' },
];

interface CaseCardProps {
  case: CustomerCase;
  onClick: () => void;
}

const CaseCard: React.FC<CaseCardProps> = ({ case: customerCase, onClick }) => {
  const { isDarkMode } = useDarkMode();
  const [showNotificationOptions, setShowNotificationOptions] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<string | null>(null);
  
  // New states for reassign functionality
  const [showReassignOptions, setShowReassignOptions] = useState(false);
  const [showReassignConfirmation, setShowReassignConfirmation] = useState(false);
  const [showReassignStatus, setShowReassignStatus] = useState(false);
  const [showRevertConfirmation, setShowRevertConfirmation] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isReassigned, setIsReassigned] = useState(false);
  
  const notificationOptions = ["1h", "2h", "3h", "2200hr", "0930am"];
  
  const handleNotificationClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowNotificationOptions(!showNotificationOptions);
    // Close other popups
    setShowReassignOptions(false);
    setShowReassignConfirmation(false);
    setShowReassignStatus(false);
    setShowRevertConfirmation(false);
  };
  
  const selectNotification = (option: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedNotification(option);
    setShowNotificationOptions(false);
  };
  
  // Reassign handlers
  const handleReassignClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Close notification dropdown
    setShowNotificationOptions(false);
    
    if (isReassigned) {
      setShowReassignStatus(true);
    } else {
      setShowReassignOptions(!showReassignOptions);
    }
  };

  const selectUser = (user: User, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedUser(user);
    setShowReassignOptions(false);
    setShowReassignConfirmation(true);
  };

  const confirmReassignment = (confirm: boolean, e: React.MouseEvent) => {
    e.stopPropagation();
    setShowReassignConfirmation(false);
    if (confirm) {
      setIsReassigned(true);
    }
  };

  const handleStatusInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowReassignStatus(false);
    setShowRevertConfirmation(true);
  };

  const confirmRevert = (confirm: boolean, e: React.MouseEvent) => {
    e.stopPropagation();
    setShowRevertConfirmation(false);
    if (confirm) {
      setIsReassigned(false);
      setSelectedUser(null);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={`${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700 shadow-lg shadow-gray-900/30' 
          : 'bg-white border-gray-100'
      } rounded-xl shadow-lg p-4 cursor-pointer w-[70%] mb-4 border`}
      onClick={onClick}
    >
      <div className="flex flex-wrap" style={{ minHeight: "80px" }}>
        {/* Left section */}
        <div className="w-[30%] pr-2">
          <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} truncate`}>
            {customerCase.customerName}
          </h3>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>ID: {customerCase.id}</p>
        </div>
        
        {/* Middle-left section */}
        <div className="w-[20%] flex flex-col items-end justify-center">
          <p className="text-lg font-bold text-blue-600">
            ₹{customerCase.loanAmount.toLocaleString()}
          </p>
          <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>Applied Loan Amount</span>
        </div>
        
        {/* Middle-right section */}
        <div className="w-[30%] flex items-center justify-center">
          <p className="text-gray-500">x</p>
        </div>
        
        {/* Right section - Actions */}
        <div className="w-[20%] flex items-center justify-end space-x-2">
          {/* Reassign button */}
          <div className="relative inline-block">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-full hover:bg-gray-100 flex items-center ${isReassigned ? 'bg-amber-100' : ''}`}
              onClick={handleReassignClick}
            >
              <Users size={20} className={isReassigned ? "text-amber-500" : "text-gray-600"} />
              {isReassigned && selectedUser && (
                <span className="ml-1 text-xs font-medium text-amber-600">{selectedUser.initials}</span>
              )}
            </motion.button>
            
            {/* Reassign options dropdown - NO ANIMATION */}
            {showReassignOptions && (
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <div className="py-2">
                  <h3 className="px-4 py-1 text-sm font-medium text-gray-500">Select user to reassign</h3>
                  <ul className="mt-1 max-h-60 overflow-auto">
                    {users.map((user) => (
                      <li 
                        key={user.id}
                        onClick={(e) => selectUser(user, e)}
                        className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                      >
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                            {user.initials}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-800">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.designation}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            
            {/* Reassignment confirmation dialog - NO ANIMATION */}
            {showReassignConfirmation && selectedUser && (
              <div className="absolute left-0 mt-2 w-72 bg-white rounded-md shadow-lg z-10 border border-gray-200 p-4">
                <p className="text-sm text-gray-700">
                  Sure to reassign to <span className="font-medium">{selectedUser.name}</span>?
                  If Yes, we will let the user mentioned know.
                </p>
                <div className="mt-4 flex space-x-3">
                  <button 
                    onClick={(e) => confirmReassignment(true, e)}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                  >
                    Yes
                  </button>
                  <button 
                    onClick={(e) => confirmReassignment(false, e)}
                    className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300"
                  >
                    No
                  </button>
                </div>
              </div>
            )}
            
            {/* Reassign status dialog - NO ANIMATION */}
            {showReassignStatus && selectedUser && (
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10 border border-gray-200 p-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-gray-700">
                    Reassigned Status
                  </p>
                  <button 
                    onClick={handleStatusInfoClick}
                    className="text-gray-500 hover:text-blue-600"
                  >
                    <Info size={16} />
                  </button>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                    Assigned to: <span className="font-medium">{selectedUser.name}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {selectedUser.designation}
                  </p>
                  <p className="text-xs text-green-600 mt-2">
                    Reassigned on {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
            
            {/* Revert confirmation dialog - NO ANIMATION */}
            {showRevertConfirmation && (
              <div className="absolute left-0 mt-2 w-72 bg-white rounded-md shadow-lg z-10 border border-gray-200 p-4">
                <p className="text-sm text-gray-700">
                  Revert your action of reassignment?
                </p>
                <div className="mt-4 flex space-x-3">
                  <button 
                    onClick={(e) => confirmRevert(true, e)}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                  >
                    Yes
                  </button>
                  <button 
                    onClick={(e) => confirmRevert(false, e)}
                    className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300"
                  >
                    No
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Notification button */}
          <div className="relative inline-block">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full hover:bg-gray-100 flex items-center"
              onClick={handleNotificationClick}
            >
              {selectedNotification ? (
                <Clock size={20} className="text-blue-600" />
              ) : (
                <Bell size={20} className="text-gray-600" />
              )}
              {selectedNotification && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-auto min-w-5 px-1 flex items-center justify-center">
                  {selectedNotification}
                </span>
              )}
            </motion.button>
            
            {/* Notification options - NO ANIMATION */}
            {showNotificationOptions && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <ul className="py-1">
                  {notificationOptions.map((option) => (
                    <li 
                      key={option}
                      onClick={(e) => selectNotification(option, e)}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer"
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CaseCard;