import { Campaign, Metrics, ABTest } from '../types';

export const calculateROI = (campaign: Campaign, metrics: Metrics[]) => {
  const totalSpent = metrics.reduce((acc, m) => acc + (m.clicks * m.cpc), 0);
  const revenue = totalSpent * 1.5; // Example revenue calculation
  return ((revenue - totalSpent) / totalSpent) * 100;
};

export const predictPerformance = (metrics: Metrics[]) => {
  if (metrics.length < 2) return null;

  const recentMetrics = metrics.slice(-7);
  const avgCTR = recentMetrics.reduce((acc, m) => acc + m.ctr, 0) / recentMetrics.length;
  const trend = (recentMetrics[recentMetrics.length - 1].ctr - recentMetrics[0].ctr) / recentMetrics[0].ctr;

  return {
    predictedCTR: avgCTR * (1 + trend),
    trend: trend * 100,
    confidence: calculateConfidence(recentMetrics),
  };
};

export const calculateConfidence = (metrics: Metrics[]) => {
  const values = metrics.map(m => m.ctr);
  const mean = values.reduce((acc, val) => acc + val, 0) / values.length;
  const variance = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / values.length;
  return 100 - (Math.sqrt(variance) / mean * 100);
};