import { useState, useEffect } from 'react';
import { ABTest } from '../types';
import { generateId } from '../utils/helpers';
import { getABTests, saveABTests } from '../utils/storage';

export const useABTests = () => {
  const [tests, setTests] = useState<ABTest[]>([]);

  useEffect(() => {
    setTests(getABTests());
  }, []);

  const addTest = (test: Omit<ABTest, 'id'>) => {
    const newTests = [...tests, { ...test, id: generateId() }];
    setTests(newTests);
    saveABTests(newTests);
  };

  const getTestsByCampaign = (campaignId: string) => {
    return tests.filter(test => test.campaignId === campaignId);
  };

  const getTestResults = (campaignId: string) => {
    const campaignTests = getTestsByCampaign(campaignId);
    if (campaignTests.length === 0) return null;

    const winner = campaignTests.reduce((prev, current) => 
      prev.ctr > current.ctr ? prev : current
    );

    return {
      winner,
      improvement: ((winner.ctr - campaignTests[0].ctr) / campaignTests[0].ctr) * 100,
      variations: campaignTests.length,
    };
  };

  return { tests, addTest, getTestsByCampaign, getTestResults };
};