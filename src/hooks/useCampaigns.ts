import { useState, useEffect } from 'react';
import { Campaign } from '../types';
import { generateId } from '../utils/helpers';
import { getCampaigns, saveCampaigns } from '../utils/storage';

export const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    setCampaigns(getCampaigns());
  }, []);

  const addCampaign = (campaign: Omit<Campaign, 'id'>) => {
    const newCampaigns = [...campaigns, { ...campaign, id: generateId() }];
    setCampaigns(newCampaigns);
    saveCampaigns(newCampaigns);
  };

  const updateCampaign = (id: string, updates: Partial<Campaign>) => {
    const newCampaigns = campaigns.map(camp => 
      camp.id === id ? { ...camp, ...updates } : camp
    );
    setCampaigns(newCampaigns);
    saveCampaigns(newCampaigns);
  };

  const deleteCampaign = (id: string) => {
    const newCampaigns = campaigns.filter(camp => camp.id !== id);
    setCampaigns(newCampaigns);
    saveCampaigns(newCampaigns);
  };

  const getCampaignAnalytics = (id: string) => {
    const campaign = campaigns.find(c => c.id === id);
    if (!campaign) return null;

    return {
      campaign,
      metrics: [], // Add metrics integration
      tests: [], // Add A/B tests integration
      performance: {
        ctr: 0,
        cpc: 0,
        impressions: 0,
        clicks: 0,
      },
    };
  };

  return { campaigns, addCampaign, updateCampaign, deleteCampaign, getCampaignAnalytics };
};