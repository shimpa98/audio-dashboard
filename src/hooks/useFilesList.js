import { useState } from 'react';
import { apiEndpoints } from '../services/api';
import { toast } from 'react-toastify';

const mockFiles = [
  { filename: 'audio_001.mp3', timestamp_readable: '2025-10-27 14:30:45', processing_time: 3.45, status: 'success', size_bytes: 5242880 },
  { filename: 'audio_002.mp3', timestamp_readable: '2025-10-26 09:15:30', processing_time: 2.87, status: 'success', size_bytes: 4194304 },
  { filename: 'audio_003.mp3', timestamp_readable: '2025-10-25 16:20:15', processing_time: 4.12, status: 'failed', size_bytes: 3145728 },
];

export const useFilesList = (filter = { days: 7 }) => {
  const [files, setFiles] = useState(mockFiles);
  const [loading, setLoading] = useState(false); // Не loading по умолчанию

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
    } catch (err) {
      setFiles(mockFiles); // Fallback
      toast.error('Files list unavailable. Using mock data.');
    } finally {
      setLoading(false);
    }
  };

  return { files, loading, fetchFiles };
};