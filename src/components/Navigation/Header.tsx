import React from 'react';
import { Target } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Target className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">AffiliateHub</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;