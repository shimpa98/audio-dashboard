import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import Dashboard from './components/Dashboard/Dashboard';
import ConfigPanel from './components/ConfigPanel/ConfigPanel';
import { useAppStatus } from './hooks/useAppStatus';
import StatusPanel from './components/StatusPanel/StatusPanel';
import ControlButtons from './components/ControlButtons/ControlButtons';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="alert alert-warning">
      <p>Something went wrong: {error.message}</p>
      <button onClick={resetErrorBoundary} className="danger">
        Try again
      </button>
    </div>
  );
}

function App() {
  const { status, loading: statusLoading, error: statusError } = useAppStatus();
  const [activeTab, setActiveTab] = useState('dashboard');
  const isOffline = !!statusError;

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Router>
        <div className="min-h-screen">
          {isOffline && (
            <div className="alert alert-warning text-center">
              ⚠️ Offline mode: Using mock data. Server unavailable.
            </div>
          )}
          <nav>
            <div className="nav-container">
              <Link to="/" className="nav-logo">
                Audio Processing Dashboard
              </Link>
              <div className="nav-links">
                <Link to="/" className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
                  Dashboard
                </Link>
                <Link to="/config" className={activeTab === 'config' ? 'active' : ''} onClick={() => setActiveTab('config')}>
                  Configuration
                </Link>
              </div>
            </div>
          </nav>
          <main>
            <Routes>
              <Route path="/" element={<Dashboard status={status} loading={statusLoading} />} />
              <Route path="/config" element={<ConfigPanel />} />
            </Routes>
          </main>
          {!statusLoading && <StatusPanel status={status} />}
          {!statusLoading && <ControlButtons status={status} />}
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;