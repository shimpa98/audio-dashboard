// src/components/Dashboard/Dashboard.jsx
import React, { useState } from 'react';
import MetricsChart from '../MetricsChart/MetricsChart';
import FilesList from '../FilesList/FilesList';
import UploadArea from '../UploadArea/UploadArea';
import TimelineView from '../TimelineView/TimelineView';
import QuickStats from './QuickStats';

const Dashboard = ({ status }) => {
  const [activeView, setActiveView] = useState('metrics'); // metrics, files, timeline

  return (
    <div className="space-y-6">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Audio Processing Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Monitor and manage your audio transcription tasks</p>
      </header>

      <QuickStats status={status} />

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveView('metrics')}
          className={`px-4 py-2 rounded ${activeView === 'metrics' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Metrics
        </button>
        <button
          onClick={() => setActiveView('files')}
          className={`px-4 py-2 rounded ${activeView === 'files' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Files
        </button>
        <button
          onClick={() => setActiveView('timeline')}
          className={`px-4 py-2 rounded ${activeView === 'timeline' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Timeline
        </button>
      </div>

      <UploadArea />

      {activeView === 'metrics' && <MetricsChart />}
      {activeView === 'files' && <FilesList />}
      {activeView === 'timeline' && <TimelineView />}

      <footer className="text-center text-sm text-gray-500 mt-8">
        API: http://localhost:8000 | Polling every 2s
      </footer>
    </div>
  );
};

export default Dashboard;