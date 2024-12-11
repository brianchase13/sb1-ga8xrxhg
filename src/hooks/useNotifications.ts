import { useState, useEffect } from 'react';
import { Campaign, Metrics } from '../types';

interface Notification {
  id: string;
  type: 'warning' | 'info' | 'success';
  message: string;
  timestamp: number;
  read: boolean;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const checkMetrics = (metrics: Metrics[], campaign: Campaign) => {
    const recentMetrics = metrics[metrics.length - 1];
    if (!recentMetrics) return;

    if (recentMetrics.ctr < 2) {
      addNotification({
        type: 'warning',
        message: `Low CTR alert: ${campaign.name} CTR has dropped below 2%`,
      });
    }

    if (recentMetrics.cpc > campaign.budget * 0.1) {
      addNotification({
        type: 'warning',
        message: `High CPC alert: ${campaign.name} CPC is above 10% of budget`,
      });
    }
  };

  const addNotification = ({ type, message }: Pick<Notification, 'type' | 'message'>) => {
    const newNotification: Notification = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      message,
      timestamp: Date.now(),
      read: false,
    };

    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return {
    notifications,
    addNotification,
    markAsRead,
    clearAll,
    checkMetrics,
  };
};