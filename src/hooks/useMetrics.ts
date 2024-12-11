import { useState, useEffect } from 'react';
import { Metrics } from '../types';
import { generateId } from '../utils/helpers';
import { getMetrics, saveMetrics } from '../utils/storage';

export const useMetrics = () => {
  const [metrics, setMetrics] = useState<Metrics[]>([]);

  useEffect(() => {
    setMetrics(getMetrics());
  }, []);

  const addMetrics = (metric: Omit<Metrics, 'id'>) => {
    const newMetrics = [...metrics, { ...metric, id: generateId() }];
    setMetrics(newMetrics);
    saveMetrics(newMetrics);
  };

  const getMetricsByCampaign = (campaignId: string) => {
    return metrics.filter(metric => metric.campaignId === campaignId);
  };

  const getPerformanceSummary = (campaignId: string) => {
    const campaignMetrics = getMetricsByCampaign(campaignId);
    if (campaignMetrics.length === 0) return null;

    return {
      avgCTR: campaignMetrics.reduce((acc, m) => acc + m.ctr, 0) / campaignMetrics.length,
      avgCPC: campaignMetrics.reduce((acc, m) => acc + m.cpc, 0) / campaignMetrics.length,
      totalImpressions: campaignMetrics.reduce((acc, m) => acc + m.impressions, 0),
      totalClicks: campaignMetrics.reduce((acc, m) => acc + m.clicks, 0),
    };
  };

  return { metrics, addMetrics, getMetricsByCampaign, getPerformanceSummary };
};