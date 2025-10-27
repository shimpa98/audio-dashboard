import React from 'react';
import { apiEndpoints } from '../../services/api';
import { toast } from 'react-toastify';
import { useAppStatus } from '../../hooks/useAppStatus';

const ControlButtons = ({ status }) => {
  const { refetch, loading } = useAppStatus();
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

  if (loading || appStatus === 'stopped') return null;

  return (
    <div className="fixed bottom-4 left-4 card p-4 z-50">
      <h3 className="font-bold text-gray-800 dark:text-white mb-2">Controls</h3>
      <div className="flex space-x-2">
        {appStatus !== 'paused' && (
          <button onClick={() => handleControl('pause')} className="btn-warning">
            Pause
          </button>
        )}
        {appStatus === 'paused' && (
          <button onClick={() => handleControl('resume')} className="btn-primary">
            Resume
          </button>
        )}
        <button onClick={() => handleControl('stop')} className="btn-danger">
          Stop
        </button>
      </div>
    </div>
  );
};

export default ControlButtons;