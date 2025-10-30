import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'gold';
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = 'default',
}) => {
  const variantClasses = {
    default: 'border-dark-700 bg-dark-800/50',
    success: 'border-primary-800/50 bg-primary-900/20',
    warning: 'border-gold-800/50 bg-gold-900/20',
    danger: 'border-accent-800/50 bg-accent-900/20',
    gold: 'border-gold-700/50 bg-gradient-to-br from-gold-900/30 to-gold-800/20',
  };

  const iconClasses = {
    default: 'text-dark-400',
    success: 'text-primary-400',
    warning: 'text-gold-400',
    danger: 'text-accent-400',
    gold: 'text-gold-400',
  };

  return (
    <div
      className={`rounded-xl border p-5 transition-all hover:shadow-lg ${variantClasses[variant]} group cursor-pointer hover:scale-[1.02]`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-dark-400 mb-1">{title}</p>
          <p className={`text-2xl font-bold mb-1 ${iconClasses[variant]}`}>{value}</p>
          {subtitle && <p className="text-xs text-dark-500">{subtitle}</p>}
        </div>
        <div
          className={`p-3 rounded-lg ${
            variant === 'default'
              ? 'bg-dark-700'
              : variant === 'success'
              ? 'bg-primary-900/40'
              : variant === 'warning'
              ? 'bg-gold-900/40'
              : variant === 'danger'
              ? 'bg-accent-900/40'
              : 'bg-gold-900/40'
          } transition-transform group-hover:scale-110`}
        >
          <Icon className={`h-6 w-6 ${iconClasses[variant]}`} />
        </div>
      </div>
      {trend && (
        <div className="mt-3 flex items-center space-x-1">
          <svg
            className={`h-4 w-4 ${trend.isPositive ? 'text-primary-400' : 'text-accent-400'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            {trend.isPositive ? (
              <path
                fillRule="evenodd"
                d="M12 7a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0L11 10.586 14.586 7H13a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            ) : (
              <path
                fillRule="evenodd"
                d="M12 13a1 1 0 001 1h4a1 1 0 001-1v-4a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 4.707 6.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0L11 9.414 14.586 13H13a1 1 0 00-1 1z"
                clipRule="evenodd"
              />
            )}
          </svg>
          <span
            className={`text-xs font-medium ${
              trend.isPositive ? 'text-primary-400' : 'text-accent-400'
            }`}
          >
            {trend.isPositive ? '+' : ''}
            {trend.value}%
          </span>
          <span className="text-xs text-dark-500">vs last month</span>
        </div>
      )}
    </div>
  );
};

export default StatsCard;