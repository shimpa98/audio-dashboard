// src/hooks/useConfig.js
import { useState, useEffect } from 'react';
import { apiEndpoints } from '../services/api';
import { toast } from 'react-toastify';

export const useConfig = () => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await apiEndpoints.getConfig();
        setConfig(response.data);
      } catch (err) {
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
      setConfig(response.data.config);
      toast.success('Configuration updated successfully!');
      return { success: true, data: response.data };
    } catch (err) {
      const errorData = err.response?.data;
      toast.error(errorData?.details?.reason || 'Update failed');
      return { success: false, error: errorData };
    }
  };

  return { config, loading, error, updateConfig };
};