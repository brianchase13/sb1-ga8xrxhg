import React from 'react';

export const StatCardSkeleton: React.FC = () => (
  <div className="rounded-xl border border-dark-700 bg-dark-800/50 p-5 animate-pulse">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <div className="h-4 w-24 bg-dark-700 rounded mb-2"></div>
        <div className="h-8 w-32 bg-dark-700 rounded mb-2"></div>
        <div className="h-3 w-20 bg-dark-700 rounded"></div>
      </div>
      <div className="h-12 w-12 bg-dark-700 rounded-lg"></div>
    </div>
  </div>
);

export const BetCardSkeleton: React.FC = () => (
  <div className="rounded-lg border border-dark-700 bg-dark-800/50 p-4 animate-pulse">
    <div className="flex items-start justify-between mb-3">
      <div className="flex-1">
        <div className="h-3 w-16 bg-dark-700 rounded mb-2"></div>
        <div className="h-5 w-40 bg-dark-700 rounded mb-2"></div>
        <div className="h-3 w-24 bg-dark-700 rounded"></div>
      </div>
      <div className="h-6 w-16 bg-dark-700 rounded"></div>
    </div>
    <div className="h-20 bg-dark-700 rounded mb-3"></div>
    <div className="flex justify-between">
      <div className="h-4 w-20 bg-dark-700 rounded"></div>
      <div className="h-4 w-20 bg-dark-700 rounded"></div>
    </div>
  </div>
);

export const TableRowSkeleton: React.FC = () => (
  <tr className="border-b border-dark-800/50">
    <td className="py-4 px-4">
      <div className="h-4 w-24 bg-dark-700 rounded animate-pulse"></div>
    </td>
    <td className="py-4 px-4">
      <div className="h-4 w-16 bg-dark-700 rounded animate-pulse"></div>
    </td>
    <td className="py-4 px-4">
      <div className="h-4 w-16 bg-dark-700 rounded animate-pulse"></div>
    </td>
    <td className="py-4 px-4">
      <div className="h-4 w-20 bg-dark-700 rounded animate-pulse"></div>
    </td>
  </tr>
);

export const ChartSkeleton: React.FC = () => (
  <div className="h-64 bg-dark-800/50 border border-dark-700 rounded-lg flex items-center justify-center animate-pulse">
    <div className="text-center">
      <div className="h-6 w-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
      <div className="h-3 w-32 bg-dark-700 rounded mx-auto"></div>
    </div>
  </div>
);
