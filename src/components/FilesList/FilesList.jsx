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

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Recent Files</h2>
      <div className="mb-4 flex space-x-2">
        <select name="days" onChange={handleFilterChange} className="p-2">
          <option value={7}>Last 7 Days</option>
          <option value={30}>Last 30 Days</option>
        </select>
        <input type="date" name="date" onChange={handleFilterChange} className="p-2" />
        <select name="status" onChange={handleFilterChange} className="p-2">
          <option value="">All Status</option>
          <option value="success">Success</option>
          <option value="failed">Failed</option>
        </select>
      </div>
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="spinner"></div>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Filename</th>
              <th>Time</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <tr key={index}>
                <td>{file.filename}</td>
                <td>{file.timestamp_readable}</td>
                <td>{file.processing_time.toFixed(2)}s</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      file.status === 'success' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                    }`}
                  >
                    {file.status}
                  </span>
                </td>
                <td>{(file.size_bytes / 1024 / 1024).toFixed(2)} MB</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FilesList;