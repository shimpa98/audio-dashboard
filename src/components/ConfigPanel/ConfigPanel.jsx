import React, { useState, useEffect } from 'react';
import { useConfig } from '../../hooks/useConfig';
import { toast } from 'react-toastify';

const ConfigPanel = () => {
  const { config, loading, updateConfig } = useConfig();
  const [formData, setFormData] = useState({
    transcription: {
      max_workers: 3,
      max_file_size_mb: 100,
      timeout_seconds: 300,
      polling_interval_seconds: 2,
      max_polling_attempts: 300,
      auth_max_retries: 5,
      auth_retry_delay_seconds: 5,
      connection_timeout_seconds: 10,
      read_timeout_seconds: 45,
      write_timeout_seconds: 30,
    },
    file_manager: {
      upload_folder: 'storage/audio_uploads',
      processing_folder: 'storage/processing',
      completed_folder: 'storage/completed',
      extensions: ['mp3', 'wav', 'm4a', 'flac', 'ogg', 'aac'],
    },
    api: {
      port: 8000,
      host: '0.0.0.0',
      reload: false,
      log_level: 'info',
    },
    monitoring: {
      metrics_enabled: true,
      history_retention_days: 30,
    },
  });
  const [originalConfig, setOriginalConfig] = useState(null);

  useEffect(() => {
    if (config) {
      setFormData(config);
      setOriginalConfig(JSON.parse(JSON.stringify(config)));
    }
  }, [config]);

  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: typeof value === 'string' ? value : Number(value),
      },
    }));
  };

  const handleSave = async () => {
    const updates = {};
    Object.keys(formData).forEach((section) => {
      const diff = {};
      Object.keys(formData[section]).forEach((field) => {
        if (formData[section][field] !== originalConfig?.[section]?.[field]) {
          diff[field] = formData[section][field];
        }
      });
      if (Object.keys(diff).length > 0) {
        updates[section] = diff;
      }
    });

    if (Object.keys(updates).length === 0) {
      toast.info('No changes to save');
      return;
    }

    const result = await updateConfig(updates);
    if (result.success) {
      setOriginalConfig(JSON.parse(JSON.stringify(formData)));
    }
  };

  const handleReset = () => {
    if (config) {
      setFormData(JSON.parse(JSON.stringify(config)));
      toast.info('Reset to current config');
    }
  };

  const handleRevert = () => {
    if (originalConfig) {
      setFormData(JSON.parse(JSON.stringify(originalConfig)));
      toast.info('Reverted changes');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Configuration Panel</h1>
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <section className="card">
            <h2 className="text-lg font-semibold mb-4">📊 Transcription Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label>
                <span>Max Workers:</span>
                <input
                  type="number"
                  value={formData.transcription.max_workers}
                  onChange={(e) => handleChange('transcription', 'max_workers', e.target.value)}
                  min={1}
                  max={32}
                />
              </label>
              <label>
                <span>Max File Size (MB):</span>
                <input
                  type="number"
                  value={formData.transcription.max_file_size_mb}
                  onChange={(e) => handleChange('transcription', 'max_file_size_mb', e.target.value)}
                  min={1}
                  max={1024}
                />
              </label>
              <label>
                <span>Timeout (sec):</span>
                <input
                  type="number"
                  value={formData.transcription.timeout_seconds}
                  onChange={(e) => handleChange('transcription', 'timeout_seconds', e.target.value)}
                />
              </label>
              <label>
                <span>Polling Interval (sec):</span>
                <input
                  type="number"
                  value={formData.transcription.polling_interval_seconds}
                  onChange={(e) => handleChange('transcription', 'polling_interval_seconds', e.target.value)}
                  min={1}
                />
              </label>
            </div>
          </section>
          <section className="card">
            <h2 className="text-lg font-semibold mb-4">📁 File Manager Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label>
                <span>Upload Folder:</span>
                <input
                  type="text"
                  value={formData.file_manager.upload_folder}
                  onChange={(e) => handleChange('file_manager', 'upload_folder', e.target.value)}
                />
              </label>
            </div>
          </section>
          <section className="card">
            <h2 className="text-lg font-semibold mb-4">⚙️ API Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label>
                <span>Port:</span>
                <input
                  type="number"
                  value={formData.api.port}
                  onChange={(e) => handleChange('api', 'port', e.target.value)}
                />
              </label>
              <label>
                <span>Log Level:</span>
                <select
                  value={formData.api.log_level}
                  onChange={(e) => handleChange('api', 'log_level', e.target.value)}
                >
                  <option value="info">Info</option>
                  <option value="debug">Debug</option>
                  <option value="error">Error</option>
                </select>
              </label>
            </div>
          </section>
          <section className="card">
            <h2 className="text-lg font-semibold mb-4">💾 Monitoring</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.monitoring.metrics_enabled}
                  onChange={(e) => handleChange('monitoring', 'metrics_enabled', e.target.checked)}
                  className="mr-2"
                />
                Metrics Enabled
              </label>
              <label>
                <span>History Retention (days):</span>
                <input
                  type="number"
                  value={formData.monitoring.history_retention_days}
                  onChange={(e) => handleChange('monitoring', 'history_retention_days', e.target.value)}
                />
              </label>
            </div>
          </section>
          <div className="flex space-x-4">
            <button className="warning" onClick={handleReset}>
              Reset to Default
            </button>
            <button className="danger" onClick={handleRevert}>
              Revert Changes
            </button>
            <button onClick={handleSave}>Save Configuration</button>
          </div>
          <div className="alert alert-warning">
            ℹ️ Configuration will be applied without restart (where possible). Some changes require restart.
          </div>
        </>
      )}
    </div>
  );
};

export default ConfigPanel;