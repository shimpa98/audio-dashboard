import { useState, useEffect } from 'react';
import { apiEndpoints } from '../services/api';
import { toast } from 'react-toastify';

// Мок-данные для fallback
const mockStatus = {
  status: 'running',
  uptime_seconds: 3600,
  timestamp: new Date().toISOString(),
  tasks: { pool_status: 'running', active_workers: 3, queue_size: 5, processing: 2, pending: 3 },
  files: { uploaded: 150, processing: 2, completed: 145, failed: 3 },
  metrics: { session_successful: 145, session_failed: 3, all_time_successful: 1250, all_time_failed: 45 },
};

export const useAppStatus = () => {
  const [status, setStatus] = useState(mockStatus); // Стартуем с мок
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStatus = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiEndpoints.getStatus();
      setStatus(response.data);
    } catch (err) {
      // Не устанавливаем error в state (чтобы UI не сломался), используем мок
      setStatus(mockStatus);
      if (!error) { // Toast только раз, чтобы не спамить
        toast.error('Server unavailable. Using mock data. Check connection.');
      }
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 2000); // Продолжаем polling
    return () => clearInterval(interval);
  }, []);

  return { status, loading, error, refetch: fetchStatus };
};