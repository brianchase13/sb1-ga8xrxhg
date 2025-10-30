import React from 'react';
import { Calculator, Info, TrendingUp, Percent } from 'lucide-react';

interface CalculationBreakdownProps {
  title: string;
  value: number | string;
  explanation: string;
  formula: string;
  steps?: string[];
  sources?: string[];
}

const CalculationBreakdown: React.FC<CalculationBreakdownProps> = ({
  title,
  value,
  explanation,
  formula,
  steps = [],
  sources = [],
}) => {
  return (
    <div className="bg-dark-800/50 border border-dark-700 rounded-xl p-4 space-y-3">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-bold text-dark-100 mb-1">{title}</h3>
          <p className="text-xs text-dark-400">{explanation}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary-400">{value}</div>
        </div>
      </div>

      {/* Formula */}
      <div className="bg-dark-900/50 border border-dark-800 rounded-lg p-3">
        <div className="flex items-center space-x-2 mb-2">
          <Calculator className="h-3.5 w-3.5 text-primary-400" />
          <span className="text-xs font-bold text-dark-300">Formula</span>
        </div>
        <code className="text-xs text-primary-400 font-mono block">{formula}</code>
      </div>

      {/* Steps */}
      {steps.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-3.5 w-3.5 text-gold-400" />
            <span className="text-xs font-bold text-dark-300">Calculation Steps</span>
          </div>
          <ol className="space-y-1.5">
            {steps.map((step, idx) => (
              <li key={idx} className="text-xs text-dark-400 flex items-start space-x-2">
                <span className="text-primary-400 font-bold flex-shrink-0">{idx + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Sources */}
      {sources.length > 0 && (
        <div className="pt-3 border-t border-dark-800">
          <div className="flex items-center space-x-2 mb-2">
            <Info className="h-3.5 w-3.5 text-dark-500" />
            <span className="text-xs font-bold text-dark-400">Data Sources</span>
          </div>
          <ul className="space-y-1">
            {sources.map((source, idx) => (
              <li key={idx} className="text-xs text-dark-500">
                • {source}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Timestamp */}
      <div className="pt-2 border-t border-dark-800 flex items-center justify-between text-xs text-dark-500">
        <span>Last updated</span>
        <span>{new Date().toLocaleString()}</span>
      </div>
    </div>
  );
};

export default CalculationBreakdown;
