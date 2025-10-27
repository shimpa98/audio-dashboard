import React, { useState } from 'react';
import MetricsChart from '../MetricsChart/MetricsChart';
import FilesList from '../FilesList/FilesList';
import UploadArea from '../UploadArea/UploadArea';
import TimelineView from '../TimelineView/TimelineView';
import QuickStats from './QuickStats';

const Dashboard = ({ status, loading }) => {
  const [activeView, setActiveView] = useState('metrics');

  return (
    <div className="space-y-6">
      <header className="text-center">
        <h1 className="text-3xl font-bold">Audio Processing Dashboard</h1>
        <p className="text-secondary mt-2">Monitor and manage your audio transcription tasks</p>
      </header>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <QuickStats status={status} />
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveView('metrics')}
              className={activeView === 'metrics' ? 'active' : ''}
            >
              Metrics
            </button>
            <button
              onClick={() => setActiveView('files')}
              className={activeView === 'files' ? 'active' : ''}
            >
              Files
            </button>
            <button
              onClick={() => setActiveView('timeline')}
              className={activeView === 'timeline' ? 'active' : ''}
            >
              Timeline
            </button>
          </div>
          <UploadArea />
          {activeView === 'metrics' && <MetricsChart />}
          {activeView === 'files' && <FilesList />}
          {activeView === 'timeline' && <TimelineView />}
          <footer className="text-center text-sm text-secondary mt-8">
            API: http://localhost:8000 | Polling every 2s
          </footer>
        </>
      )}
    </div>
  );
};

export default Dashboard;