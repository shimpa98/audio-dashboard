// src/hooks/useAppStatus.js
import { useState, useEffect } from 'react';
import { apiEndpoints } from '../services/api';
import { toast } from 'react-toastify';

export const useAppStatus = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStatus = async () => {
    try {
      setLoading(true);
      const response = await apiEndpoints.getStatus();
      setStatus(response.data);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to fetch status');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 2000); // Poll every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return { status, loading, error, refetch: fetchStatus };
};