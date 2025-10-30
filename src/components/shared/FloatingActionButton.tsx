import React, { useState } from 'react';
import { Plus, TrendingUp, Zap, Calculator, X } from 'lucide-react';

interface FloatingActionButtonProps {
  onQuickBet: () => void;
  onKellyCalc?: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onQuickBet, onKellyCalc }) => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { icon: TrendingUp, label: 'Quick Bet', color: 'bg-gold-500', action: onQuickBet },
    { icon: Calculator, label: 'Kelly Calc', color: 'bg-primary-500', action: onKellyCalc || (() => {}) },
    { icon: Zap, label: 'Scan Arbs', color: 'bg-accent-500', action: () => {} },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action Menu */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 space-y-2 mb-2 animate-slide-up">
          {actions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => {
                action.action();
                setIsOpen(false);
              }}
              className="flex items-center space-x-3 bg-dark-800/95 backdrop-blur-xl border border-dark-700 rounded-full px-4 py-3 hover:bg-dark-700 transition-all group shadow-lg hover:scale-105"
            >
              <div className={`p-2 ${action.color} rounded-full group-hover:scale-110 transition-transform`}>
                <action.icon className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium text-dark-100 pr-2">{action.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`h-14 w-14 rounded-full bg-gold-gradient shadow-2xl hover:shadow-glow-gold transition-all hover:scale-110 flex items-center justify-center ${
          isOpen ? 'rotate-45' : ''
        }`}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-dark-900" />
        ) : (
          <Plus className="h-6 w-6 text-dark-900" />
        )}
      </button>
    </div>
  );
};

export default FloatingActionButton;
