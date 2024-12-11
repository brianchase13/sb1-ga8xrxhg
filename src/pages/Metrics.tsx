import React from 'react';
import { useMetrics } from '../hooks/useMetrics';
import MetricsForm from '../components/Metrics/MetricsForm';
import { LineChart } from '../components/DataVisualization';

function Metrics() {
  const { metrics } = useMetrics();

  const chartData = {
    labels: metrics.map(m => m.date),
    datasets: [
      {
        label: 'CTR %',
        data: metrics.map(m => m.ctr),
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
      },
      {
        label: 'CPC ($)',
        data: metrics.map(m => m.cpc),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Metrics</h1>
        <p className="mt-1 text-sm text-gray-500">
          Track and analyze your campaign performance
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Add New Metrics</h2>
          <MetricsForm campaignId="demo" onSubmit={console.log} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <LineChart data={chartData} title="Performance Trends" />
        </div>
      </div>
    </div>
  );
}

export default Metrics;