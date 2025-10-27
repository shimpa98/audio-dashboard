// src/components/ControlButtons/ControlButtons.jsx
import React from 'react';
import { apiEndpoints } from '../../services/api';
import { toast } from 'react-toastify';
import { useAppStatus } from '../../hooks/useAppStatus';

const ControlButtons = ({ status }) => {
  const { refetch } = useAppStatus();
  const appStatus = status?.status;

  const handleControl = async (action) => {
    try {
      if (action === 'pause') await apiEndpoints.pauseApp();
      if (action === 'resume') await apiEndpoints.resumeApp();
      if (action === 'stop') await apiEndpoints.stopApp();
      refetch();
      toast.success(`Application ${action}d`);
    } catch (err) {
      toast.error('Control action failed');
    }
  };

  if (appStatus === 'stopped') return null;

  return (
    <div className="fixed bottom-4 left-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 z-50">
      <h3 className="font-bold text-gray-800 dark:text-white mb-2">Controls</h3>
      <div className="space-x-2">
        {appStatus !== 'paused' && (
          <button
            onClick={() => handleControl('pause')}
            className="px-3 py-1 bg-yellow-500 text-white rounded text-sm"
          >
            Pause
          </button>
        )}
        {appStatus === 'paused' && (
          <button
            onClick={() => handleControl('resume')}
            className="px-3 py-1 bg-green-500 text-white rounded text-sm"
          >
            Resume
          </button>
        )}
        <button
          onClick={() => handleControl('stop')}
          className="px-3 py-1 bg-red-500 text-white rounded text-sm"
        >
          Stop
        </button>
      </div>
    </div>
  );
};

export default ControlButtons;