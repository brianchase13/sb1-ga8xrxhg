import React, { useEffect, useState } from 'react';
import { Command, X } from 'lucide-react';

interface ShortcutItem {
  key: string;
  description: string;
  action: () => void;
}

interface KeyboardShortcutsProps {
  shortcuts: ShortcutItem[];
}

const KeyboardShortcuts: React.FC<KeyboardShortcutsProps> = ({ shortcuts }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Show shortcuts menu with ?
      if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setIsOpen(true);
        return;
      }

      // Execute shortcuts
      shortcuts.forEach((shortcut) => {
        const keys = shortcut.key.toLowerCase().split('+');
        const hasCtrl = keys.includes('ctrl') || keys.includes('cmd');
        const hasShift = keys.includes('shift');
        const mainKey = keys[keys.length - 1];

        const ctrlPressed = e.ctrlKey || e.metaKey;
        const shiftPressed = e.shiftKey;

        if (
          e.key.toLowerCase() === mainKey &&
          ctrlPressed === hasCtrl &&
          shiftPressed === hasShift
        ) {
          e.preventDefault();
          shortcut.action();
        }
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [shortcuts]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-6 p-3 bg-dark-800/90 backdrop-blur-sm border border-dark-700 rounded-full shadow-lg hover:bg-dark-700 transition-all z-40"
        title="Keyboard Shortcuts (Press ?)"
      >
        <Command className="h-5 w-5 text-dark-300" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 animate-fade-in">
      <div
        className="absolute inset-0 bg-dark-950/80 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      ></div>

      <div className="relative bg-dark-900 border border-dark-700 rounded-2xl shadow-2xl max-w-lg w-full animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-dark-800">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-500/20 rounded-lg">
              <Command className="h-5 w-5 text-primary-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-dark-100">Keyboard Shortcuts</h2>
              <p className="text-xs text-dark-400 mt-0.5">
                Master SharpBet Pro like a professional
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-dark-800 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-dark-400" />
          </button>
        </div>

        {/* Shortcuts List */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="space-y-3">
            {shortcuts.map((shortcut, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-dark-800/50 rounded-lg hover:bg-dark-800/70 transition-colors"
              >
                <span className="text-sm text-dark-200">{shortcut.description}</span>
                <div className="flex items-center space-x-1">
                  {shortcut.key.split('+').map((key, i) => (
                    <React.Fragment key={i}>
                      {i > 0 && <span className="text-dark-500 text-xs">+</span>}
                      <kbd className="px-2 py-1 bg-dark-900 border border-dark-700 rounded text-xs font-bold text-primary-400">
                        {key}
                      </kbd>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-dark-800 bg-dark-800/30">
          <p className="text-xs text-dark-500 text-center">
            Press <kbd className="px-1.5 py-0.5 bg-dark-900 border border-dark-700 rounded text-xs font-bold text-primary-400">?</kbd> anytime to view shortcuts
          </p>
        </div>
      </div>
    </div>
  );
};

export default KeyboardShortcuts;
