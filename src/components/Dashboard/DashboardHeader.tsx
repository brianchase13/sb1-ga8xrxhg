import React from 'react';

const DashboardHeader: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      <p className="mt-1 text-sm text-gray-500">
        Overview of your affiliate marketing performance
      </p>
    </div>
  );
};

export default DashboardHeader;