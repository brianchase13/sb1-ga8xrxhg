import React from 'react';
import { Clock, RefreshCw, AlertCircle } from 'lucide-react';

interface DataFreshnessIndicatorProps {
  lastUpdated: Date;
  updateInterval?: number; // in seconds
  isLive?: boolean;
}

const DataFreshnessIndicator: React.FC<DataFreshnessIndicatorProps> = ({
  lastUpdated,
  updateInterval = 300, // 5 minutes default
  isLive = false,
}) => {
  const now = new Date();
  const secondsAgo = Math.floor((now.getTime() - lastUpdated.getTime()) / 1000);

  const getTimeAgo = () => {
    if (secondsAgo < 60) return `${secondsAgo}s ago`;
    if (secondsAgo < 3600) return `${Math.floor(secondsAgo / 60)}m ago`;
    if (secondsAgo < 86400) return `${Math.floor(secondsAgo / 3600)}h ago`;
    return `${Math.floor(secondsAgo / 86400)}d ago`;
  };

  const isStale = secondsAgo > updateInterval * 2;
  const isWarning = secondsAgo > updateInterval && secondsAgo <= updateInterval * 2;

  return (
    <div
      className={`inline-flex items-center space-x-2 px-2.5 py-1 rounded-lg text-xs font-medium ${
        isLive
          ? 'bg-accent-900/20 border border-accent-700/50 text-accent-400'
          : isStale
          ? 'bg-accent-900/20 border border-accent-700/50 text-accent-400'
          : isWarning
          ? 'bg-gold-900/20 border border-gold-700/50 text-gold-400'
          : 'bg-primary-900/20 border border-primary-700/50 text-primary-400'
      }`}
    >
      {isLive ? (
        <>
          <div className="h-2 w-2 bg-accent-500 rounded-full animate-pulse"></div>
          <span>LIVE</span>
        </>
      ) : (
        <>
          {isStale ? (
            <AlertCircle className="h-3.5 w-3.5" />
          ) : (
            <Clock className="h-3.5 w-3.5" />
          )}
          <span>{getTimeAgo()}</span>
          {isStale && <span className="text-[10px]">(Stale)</span>}
        </>
      )}
    </div>
  );
};

export default DataFreshnessIndicator;
