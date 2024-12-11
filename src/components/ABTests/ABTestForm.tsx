import React from 'react';
import { ABTest } from '../../types';

interface ABTestFormProps {
  campaignId: string;
  onSubmit: (test: Omit<ABTest, 'id'>) => void;
}

const ABTestForm: React.FC<ABTestFormProps> = ({ campaignId, onSubmit }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    onSubmit({
      campaignId,
      testName: formData.get('testName') as string,
      variationName: formData.get('variationName') as string,
      ctr: Number(formData.get('ctr')),
      cpc: Number(formData.get('cpc')),
      notes: formData.get('notes') as string,
    });
    
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Test Name</label>
        <input
          type="text"
          name="testName"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Variation Name</label>
        <input
          type="text"
          name="variationName"
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

      <div>
        <label className="block text-sm font-medium text-gray-700">Notes</label>
        <textarea
          name="notes"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={3}
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add A/B Test
      </button>
    </form>
  );
};

export default ABTestForm;