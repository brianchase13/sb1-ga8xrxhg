import React from 'react';
import { Plus } from 'lucide-react';
import { useCampaigns } from '../hooks/useCampaigns';
import CampaignForm from '../components/Campaigns/CampaignForm';
import CampaignList from '../components/Campaigns/CampaignList';

function Campaigns() {
  const { campaigns, addCampaign } = useCampaigns();
  const [showForm, setShowForm] = React.useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Campaigns</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your advertising campaigns
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Campaign
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <CampaignForm
            onSubmit={(campaign) => {
              addCampaign(campaign);
              setShowForm(false);
            }}
          />
        </div>
      )}

      <CampaignList campaigns={campaigns} />
    </div>
  );
}

export default Campaigns;