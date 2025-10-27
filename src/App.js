// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import ConfigPanel from './components/ConfigPanel/ConfigPanel';
import { useAppStatus } from './hooks/useAppStatus';
import StatusPanel from './components/StatusPanel/StatusPanel';
import ControlButtons from './components/ControlButtons/ControlButtons';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { status, loading, error } = useAppStatus();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (error) return <div className="flex items-center justify-center h-screen text-red-500">Error: {error}</div>;

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <nav className="bg-white dark:bg-gray-800 shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="text-xl font-bold text-gray-800 dark:text-white">
                  Audio Processing Dashboard
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  to="/"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'dashboard'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setActiveTab('dashboard')}
                >
                  Dashboard
                </Link>
                <Link
                  to="/config"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'config'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setActiveTab('config')}
                >
                  Configuration
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Dashboard status={status} />} />
            <Route path="/config" element={<ConfigPanel />} />
          </Routes>
        </main>

        <StatusPanel status={status} />
        <ControlButtons status={status} />
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;