import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useMetrics } from '../../hooks/useMetrics';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MetricsChart = () => {
  const { metrics, loading } = useMetrics();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="spinner"></div>
        <span className="ml-2">Loading chart...</span>
      </div>
    );
  }

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'], // Заменить на реальные данные
    datasets: [
      {
        label: 'Successful',
        data: [metrics?.session?.successful || 0, 120, 190, 30, 50],
        borderColor: '#22c55e', // green-500
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
      },
      {
        label: 'Failed',
        data: [metrics?.session?.failed || 0, 30, 50, 20, 30],
        borderColor: '#ef4444', // red-500
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top', labels: { color: '#1f2937' } },
      title: { display: true, text: 'Processing Metrics Over Time', color: '#1f2937' },
    },
    scales: {
      x: { ticks: { color: '#1f2937' } },
      y: { ticks: { color: '#1f2937' } },
    },
  };

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Metrics</h2>
      <div className="p-4">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default MetricsChart;