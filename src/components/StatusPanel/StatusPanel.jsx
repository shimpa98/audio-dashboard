import React from 'react';

const StatusPanel = ({ status }) => {
  if (!status) return null;

  const { status: appStatus, tasks, files } = status;
  const uptime = Math.floor(status.uptime_seconds / 60);
  const statusClass = `status-dot status-${appStatus}`;

  return (
    <div className="status-panel">
      <h3 className="font-bold mb-2">App Status</h3>
      <div className="flex items-center mb-2">
        <div className={statusClass}></div>
        <span className="text-sm font-medium capitalize">{appStatus}</span>
      </div>
      <p className="text-xs text-secondary">Uptime: {uptime}m</p>
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