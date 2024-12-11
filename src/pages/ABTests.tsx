import React from 'react';
import { useABTests } from '../hooks/useABTests';
import ABTestForm from '../components/ABTests/ABTestForm';
import { BarChart } from '../components/DataVisualization';

function ABTests() {
  const { tests } = useABTests();

  const chartData = {
    labels: tests.map(t => t.variationName),
    datasets: [
      {
        label: 'CTR %',
        data: tests.map(t => t.ctr),
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">A/B Tests</h1>
        <p className="mt-1 text-sm text-gray-500">
          Compare different variations of your campaigns
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Add New Test</h2>
          <ABTestForm campaignId="demo" onSubmit={console.log} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <BarChart data={chartData} title="A/B Test Results" />
        </div>
      </div>
    </div>
  );
}

export default ABTests;