export interface Campaign {
  id: string;
  name: string;
  platform: 'Google Ads' | 'Facebook Ads' | 'Other';
  budget: number;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Paused' | 'Completed';
  notes?: string;
}

export interface Metrics {
  id: string;
  campaignId: string;
  date: string;
  ctr: number;
  cpc: number;
  impressions: number;
  clicks: number;
}

export interface ABTest {
  id: string;
  campaignId: string;
  testName: string;
  variationName: string;
  ctr: number;
  cpc: number;
  notes?: string;
}