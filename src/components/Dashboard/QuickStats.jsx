import React from 'react';

const QuickStats = ({ status }) => {
  if (!status) return null;

  const { tasks, files } = status;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="card">
        <h3 className="text-sm font-medium text-secondary">Queue Size</h3>
        <p className="text-2xl font-bold">{tasks.queue_size}</p>
      </div>
      <div className="card">
        <h3 className="text-sm font-medium text-secondary">Processing</h3>
        <p className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>{tasks.processing}</p>
      </div>
      <div className="card">
        <h3 className="text-sm font-medium text-secondary">Success</h3>
        <p className="text-2xl font-bold" style={{ color: 'var(--success)' }}>{files.completed}</p>
      </div>
      <div className="card">
        <h3 className="text-sm font-medium text-secondary">Failed</h3>
        <p className="text-2xl font-bold" style={{ color: 'var(--error)' }}>{files.failed}</p>
      </div>
    </div>
  );
};

export default QuickStats;