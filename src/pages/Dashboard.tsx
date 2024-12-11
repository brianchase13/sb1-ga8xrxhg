import React from 'react';
import { Target, TrendingUp, Users, DollarSign } from 'lucide-react';
import KPICard from '../components/Dashboard/KPICard';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import RecentCampaigns from '../components/Dashboard/RecentCampaigns';
import { LineChart, BarChart } from '../components/DataVisualization';

function Dashboard() {
  const kpiData = [
    {
      title: "Total Campaigns",
      value: "12",
      icon: <Target className="h-6 w-6 text-indigo-600" />,
      trend: { value: 8, isPositive: true }
    },
    {
      title: "Average CTR",
      value: "3.2%",
      icon: <TrendingUp className="h-6 w-6 text-indigo-600" />,
      trend: { value: 0.5, isPositive: true }
    },
    {
      title: "Total Clicks",
      value: "24,521",
      icon: <Users className="h-6 w-6 text-indigo-600" />,
      trend: { value: 12, isPositive: true }
    },
    {
      title: "Total Spent",
      value: "$12,435",
      icon: <DollarSign className="h-6 w-6 text-indigo-600" />,
      trend: { value: 3, isPositive: false }
    }
  ];

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'CTR %',
        data: [2.1, 2.3, 2.8, 3.2, 3.1, 3.2],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
      },
    ],
  };

  const budgetData = {
    labels: ['Google Ads', 'Facebook Ads', 'Other'],
    datasets: [
      {
        label: 'Budget Allocation',
        data: [6500, 4200, 1735],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(147, 51, 234, 0.8)',
        ],
      },
    ],
  };

  return (
    <div className="space-y-6">
      <DashboardHeader />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <KPICard
            key={kpi.title}
            title={kpi.title}
            value={kpi.value}
            icon={kpi.icon}
            trend={kpi.trend}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <LineChart data={chartData} title="CTR Trend" />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <BarChart data={budgetData} title="Budget Allocation" />
        </div>
      </div>
      <RecentCampaigns />
    </div>
  );
}

export default Dashboard;