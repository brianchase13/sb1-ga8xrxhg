import React from 'react';
import { Campaign } from '../../types';

interface CampaignFormProps {
  onSubmit: (campaign: Omit<Campaign, 'id'>) => void;
  initialValues?: Partial<Campaign>;
}

const CampaignForm: React.FC<CampaignFormProps> = ({ onSubmit, initialValues = {} }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    onSubmit({
      name: formData.get('name') as string,
      platform: formData.get('platform') as Campaign['platform'],
      budget: Number(formData.get('budget')),
      startDate: formData.get('startDate') as string,
      endDate: formData.get('endDate') as string,
      status: formData.get('status') as Campaign['status'],
      notes: formData.get('notes') as string,
    });
    
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Campaign Name</label>
        <input
          type="text"
          name="name"
          defaultValue={initialValues.name}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Platform</label>
        <select
          name="platform"
          defaultValue={initialValues.platform}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        >
          <option value="Google Ads">Google Ads</option>
          <option value="Facebook Ads">Facebook Ads</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Budget</label>
        <input
          type="number"
          name="budget"
          defaultValue={initialValues.budget}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            name="startDate"
            defaultValue={initialValues.startDate}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            name="endDate"
            defaultValue={initialValues.endDate}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select
          name="status"
          defaultValue={initialValues.status}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        >
          <option value="Active">Active</option>
          <option value="Paused">Paused</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Notes</label>
        <textarea
          name="notes"
          defaultValue={initialValues.notes}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={3}
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Save Campaign
      </button>
    </form>
  );
};

export default CampaignForm;