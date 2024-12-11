import React from 'react';
import { Metrics } from '../../types';

interface MetricsFormProps {
  campaignId: string;
  onSubmit: (metrics: Omit<Metrics, 'id'>) => void;
}

const MetricsForm: React.FC<MetricsFormProps> = ({ campaignId, onSubmit }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    onSubmit({
      campaignId,
      date: formData.get('date') as string,
      ctr: Number(formData.get('ctr')),
      cpc: Number(formData.get('cpc')),
      impressions: Number(formData.get('impressions')),
      clicks: Number(formData.get('clicks')),
    });
    
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          name="date"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">CTR (%)</label>
          <input
            type="number"
            name="ctr"
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">CPC ($)</label>
          <input
            type="number"
            name="cpc"
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Impressions</label>
          <input
            type="number"
            name="impressions"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Clicks</label>
          <input
            type="number"
            name="clicks"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add Metrics
      </button>
    </form>
  );
};

export default MetricsForm;