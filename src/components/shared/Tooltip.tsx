import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

interface TooltipProps {
  content: string;
  children?: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="cursor-help"
      >
        {children || <HelpCircle className="h-4 w-4 text-dark-400 hover:text-dark-300" />}
      </div>
      {isVisible && (
        <div
          className={`absolute z-50 ${positionClasses[position]} whitespace-nowrap animate-fade-in`}
        >
          <div className="bg-dark-800 border border-dark-700 rounded-lg px-3 py-2 shadow-xl backdrop-blur-xl">
            <p className="text-xs text-dark-200">{content}</p>
          </div>
          {/* Arrow */}
          <div
            className={`absolute w-2 h-2 bg-dark-800 border-dark-700 transform rotate-45 ${
              position === 'top'
                ? 'top-full left-1/2 -translate-x-1/2 -mt-1 border-r border-b'
                : position === 'bottom'
                ? 'bottom-full left-1/2 -translate-x-1/2 -mb-1 border-l border-t'
                : position === 'left'
                ? 'left-full top-1/2 -translate-y-1/2 -ml-1 border-t border-r'
                : 'right-full top-1/2 -translate-y-1/2 -mr-1 border-b border-l'
            }`}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
