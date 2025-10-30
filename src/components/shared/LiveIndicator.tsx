import React from 'react';

interface LiveIndicatorProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

const LiveIndicator: React.FC<LiveIndicatorProps> = ({ label = 'LIVE', size = 'md' }) => {
  const sizes = {
    sm: 'h-1.5 w-1.5',
    md: 'h-2 w-2',
    lg: 'h-2.5 w-2.5',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-xs',
    lg: 'text-sm',
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="relative flex items-center justify-center">
        <div className={`${sizes[size]} bg-accent-500 rounded-full animate-pulse`}></div>
        <div className={`absolute ${sizes[size]} bg-accent-500 rounded-full animate-ping`}></div>
      </div>
      <span className={`${textSizes[size]} font-bold text-accent-400 tracking-wider`}>
        {label}
      </span>
    </div>
  );
};

export default LiveIndicator;
