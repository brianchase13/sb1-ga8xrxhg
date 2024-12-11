import { Campaign, Metrics, ABTest } from '../types';

const STORAGE_KEYS = {
  CAMPAIGNS: 'affiliate_campaigns',
  METRICS: 'affiliate_metrics',
  ABTESTS: 'affiliate_abtests',
  NOTIFICATIONS: 'affiliate_notifications',
};

export const storage = {
  get: <T>(key: string): T[] => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  },
  set: <T>(key: string, value: T[]): void => {
    localStorage.setItem(key, JSON.stringify(value));
  },
};

export const getCampaigns = (): Campaign[] => storage.get(STORAGE_KEYS.CAMPAIGNS);
export const saveCampaigns = (campaigns: Campaign[]): void => storage.set(STORAGE_KEYS.CAMPAIGNS, campaigns);

export const getMetrics = (): Metrics[] => storage.get(STORAGE_KEYS.METRICS);
export const saveMetrics = (metrics: Metrics[]): void => storage.set(STORAGE_KEYS.METRICS, metrics);

export const getABTests = (): ABTest[] => storage.get(STORAGE_KEYS.ABTESTS);
export const saveABTests = (tests: ABTest[]): void => storage.set(STORAGE_KEYS.ABTESTS, tests);