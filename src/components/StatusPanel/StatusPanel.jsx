// src/components/StatusPanel/StatusPanel.jsx
import React from 'react';
import { useAppStatus } from '../../hooks/useAppStatus';

const StatusPanel = ({ status }) => {
  if (!status) return null;

  const { status: appStatus, tasks, files, metrics } = status;
  const uptime = Math.floor(status.uptime_seconds / 60);
  const statusColor = appStatus === 'running' ? 'bg-green-500' : appStatus === 'paused' ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 w-80 z-50">
      <h3 className="font-bold text-gray-800 dark:text-white mb-2">App Status</h3>
      <div className="flex items-center mb-2">
        <div className={`w-3 h-3 rounded-full ${statusColor} mr-2`}></div>
        <span className="text-sm font-medium capitalize">{appStatus}</span>
      </div>
      <p className="text-xs text-gray-600 dark:text-gray-400">Uptime: {uptime}m</p>
      <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
        <div>Queue: {tasks.queue_size}</div>
        <div>Processing: {tasks.processing}</div>
        <div>Success: {files.completed}</div>
        <div>Failed: {files.failed}</div>
      </div>
    </div>
  );
};

export default StatusPanel;