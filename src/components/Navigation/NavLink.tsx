import React from 'react';
import { LucideIcon } from 'lucide-react';

interface NavLinkProps {
  href: string;
  icon: LucideIcon;
  text: string;
  active?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ href, icon: Icon, text, active }) => {
  const baseClasses = "group flex items-center px-2 py-2 text-base font-medium rounded-md";
  const activeClasses = "text-indigo-600 bg-indigo-50";
  const inactiveClasses = "text-gray-600 hover:bg-gray-50 hover:text-gray-900";

  return (
    <a
      href={href}
      className={`${baseClasses} ${active ? activeClasses : inactiveClasses} ${
        !active ? 'mt-1' : ''
      }`}
    >
      <Icon className="mr-3 h-6 w-6" />
      {text}
    </a>
  );
};

export default NavLink;