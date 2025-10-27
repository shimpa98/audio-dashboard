import { useState, useEffect } from 'react';
import { apiEndpoints } from '../services/api';
import { toast } from 'react-toastify';

// Мок-данные для config
const mockConfig = {
  transcription: {
    max_workers: 3,
    max_file_size_mb: 100,
    timeout_seconds: 300,
    connection_timeout_seconds: 10,
    read_timeout_seconds: 45,
    write_timeout_seconds: 30,
    polling_interval_seconds: 2,
    max_polling_attempts: 300,
    auth_max_retries: 5,
    auth_retry_delay_seconds: 5,
  },
  file_manager: {
    upload_folder: "storage/audio_uploads",
    processing_folder: "storage/processing",
    completed_folder: "storage/completed",
    extensions: ["mp3", "wav", "m4a", "flac", "ogg", "aac"],
  },
  api: {
    port: 8000,
    host: "0.0.0.0",
    reload: false,
    log_level: "info",
  },
  monitoring: {
    metrics_enabled: true,
    history_retention_days: 30,
  },
};

export const useConfig = () => {
  const [config, setConfig] = useState(mockConfig); // Стартуем с мок
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        setError(null);
        const response = await apiEndpoints.getConfig();
        setConfig(response.data);
      } catch (err) {
        // Fallback на мок, toast
        setConfig(mockConfig);
        if (!error) {
          toast.error('Config unavailable. Using defaults.');
        }
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, []);

  const updateConfig = async (updates) => {
    try {
      const response = await apiEndpoints.updateConfig(updates);
      setConfig({ ...config, ...response.data.config });
      toast.success('Configuration updated!');
      return { success: true, data: response.data };
    } catch (err) {
      const errorData = err.response?.data;
      toast.error(errorData?.details?.reason || 'Update failed (server offline?)');
      return { success: false, error: errorData };
    }
  };

  return { config, loading, error, updateConfig };
};