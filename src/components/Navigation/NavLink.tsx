import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface NavLinkProps {
  href: string;
  icon: LucideIcon;
  text: string;
  badge?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, icon: Icon, text, badge }) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Link
      to={href}
      className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${
        isActive
          ? 'bg-primary-900/40 text-primary-400 border border-primary-800/50'
          : 'text-dark-300 hover:bg-dark-800 hover:text-dark-100 border border-transparent'
      }`}
    >
      <Icon
        className={`mr-3 h-5 w-5 transition-colors ${
          isActive ? 'text-primary-400' : 'text-dark-400 group-hover:text-dark-200'
        }`}
      />
      <span>{text}</span>
      {badge && (
        <span className="ml-auto px-2 py-0.5 bg-gold-gradient rounded text-[10px] font-bold text-dark-900">
          {badge}
        </span>
      )}
      {!badge && isActive && (
        <div className="ml-auto h-2 w-2 rounded-full bg-primary-400 animate-pulse"></div>
      )}
    </Link>
  );
};

export default NavLink;