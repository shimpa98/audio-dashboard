// src/components/FilesList/FilesList.jsx
import React, { useState } from 'react';
import { useFilesList } from '../../hooks/useFilesList';

const FilesList = () => {
  const [filter, setFilter] = useState({ days: 7 });
  const { files, loading, fetchFiles } = useFilesList(filter);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
    fetchFiles({ [name]: value });
  };

  if (loading) return <div>Loading files...</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Recent Files</h2>
      <div className="mb-4 space-x-2">
        <select name="days" onChange={handleFilterChange} className="p-2 border rounded">
          <option value={7}>Last 7 Days</option>
          <option value={30}>Last 30 Days</option>
        </select>
        <input
          type="date"
          name="date"
          onChange={handleFilterChange}
          className="p-2 border rounded"
        />
        <select name="status" onChange={handleFilterChange} className="p-2 border rounded">
          <option value="">All Status</option>
          <option value="success">Success</option>
          <option value="failed">Failed</option>
        </select>
      </div>
      <table className="w-full bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <th className="px-4 py-2 text-left">Filename</th>
            <th className="px-4 py-2 text-left">Time</th>
            <th className="px-4 py-2 text-left">Duration</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Size</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, index) => (
            <tr key={index} className="border-t">
              <td className="px-4 py-2">{file.filename}</td>
              <td className="px-4 py-2">{file.timestamp_readable}</td>
              <td className="px-4 py-2">{file.processing_time.toFixed(2)}s</td>
              <td className="px-4 py-2">
                <span className={`px-2 py-1 rounded text-xs ${
                  file.status === 'success' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                }`}>
                  {file.status}
                </span>
              </td>
              <td className="px-4 py-2">{(file.size_bytes / 1024 / 1024).toFixed(2)} MB</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FilesList;