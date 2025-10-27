import React from 'react';
import { apiEndpoints } from '../../services/api';
import { toast } from 'react-toastify';

const UploadArea = () => {
  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('audio/')) {
      try {
        const response = await apiEndpoints.uploadFile(file);
        toast.success('File uploaded and queued!');
      } catch (err) {
        toast.error(err.response?.data?.error || 'Upload failed');
      }
    } else {
      toast.error('Please select an audio file');
    }
  };

  const handleClick = (e) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'audio/*';
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) handleDrop({ dataTransfer: { files: [file] } });
    };
    input.click();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={handleClick}
      className="upload-area"
    >
      <p className="text-secondary mb-2">Drag files here or click to upload</p>
      <p className="text-sm text-secondary">Supports MP3, WAV, M4A, etc.</p>
    </div>
  );
};

export default UploadArea;