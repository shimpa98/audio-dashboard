// src/components/Dashboard/QuickStats.jsx
import React from 'react';

const QuickStats = ({ status }) => {
  if (!status) return null;

  const { tasks, files, metrics } = status;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Queue Size</h3>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{tasks.queue_size}</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Processing</h3>
        <p className="text-2xl font-bold text-blue-600">{tasks.processing}</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Success</h3>
        <p className="text-2xl font-bold text-green-600">{files.completed}</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Failed</h3>
        <p className="text-2xl font-bold text-red-600">{files.failed}</p>
      </div>
    </div>
  );
};

export default QuickStats;