import React from 'react';

const RecentCampaigns: React.FC = () => {
  return (
    <div className="mt-8 bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Recent Campaigns</h2>
      </div>
      <div className="p-6">
        <div className="text-center text-gray-500 py-8">
          Add your first campaign to see performance metrics here
        </div>
      </div>
    </div>
  );
};

export default RecentCampaigns;