import { useState, useEffect } from 'react';
import { apiEndpoints } from '../services/api';
import { toast } from 'react-toastify';

const mockMetrics = {
  session: { successful: 145, failed: 3, start_time: new Date().toISOString(), uptime_seconds: 3600 },
  all_time: { successful: 1250, failed: 45, total_processed_mb: 5432.5, average_processing_time_sec: 42.3 },
  current: { active_tasks: 2, queue_size: 5, total_mb_processing: 245.8 },
};

export const useMetrics = () => {
  const [metrics, setMetrics] = useState(mockMetrics);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await apiEndpoints.getMetrics();
        setMetrics(response.data);
      } catch (err) {
        setMetrics(mockMetrics);
        toast.error('Metrics unavailable. Using mock data.');
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  return { metrics, loading };
};