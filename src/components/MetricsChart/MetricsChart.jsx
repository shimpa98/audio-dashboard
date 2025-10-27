// src/components/MetricsChart/MetricsChart.jsx
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

  if (loading) return <div>Loading chart...</div>;

  // Mock data for demo; replace with real timeline data
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Successful',
        data: [metrics?.session?.successful || 0, 12, 19, 3, 5],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: 'Failed',
        data: [metrics?.session?.failed || 0, 3, 5, 2, 3],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Processing Metrics Over Time' },
    },
  };

  return <Line data={data} options={options} />;
};

export default MetricsChart;