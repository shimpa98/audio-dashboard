// src/hooks/useMetrics.js
import { useState, useEffect } from 'react';
import { apiEndpoints } from '../services/api';

export const useMetrics = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await apiEndpoints.getMetrics();
        setMetrics(response.data);
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  return { metrics, loading };
};