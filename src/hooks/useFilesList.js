// src/hooks/useFilesList.js
import { useState } from 'react';
import { apiEndpoints } from '../services/api';

export const useFilesList = (filter = { days: 7 }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFiles = async (params = {}) => {
    try {
      setLoading(true);
      let response;
      if (params.date) {
        response = await apiEndpoints.getFilesByDate(params.date);
      } else if (params.status) {
        response = await apiEndpoints.getFilesByStatus(params.status);
      } else if (params.pattern) {
        response = await apiEndpoints.searchFiles(params.pattern);
      } else {
        response = await apiEndpoints.getFilesLastDays(filter.days || 7);
      }
      setFiles(response.data.files || []);
    } finally {
      setLoading(false);
    }
  };

  return { files, loading, fetchFiles };
};