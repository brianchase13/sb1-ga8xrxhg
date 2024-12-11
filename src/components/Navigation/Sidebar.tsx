import React from 'react';
import { LayoutDashboard, Target, LineChart, SplitSquareVertical, Bell } from 'lucide-react';
import NavLink from './NavLink';

const navigationItems = [
  { href: '/', icon: LayoutDashboard, text: 'Dashboard', active: true },
  { href: '/campaigns', icon: Target, text: 'Campaigns' },
  { href: '/metrics', icon: LineChart, text: 'Metrics' },
  { href: '/ab-tests', icon: SplitSquareVertical, text: 'A/B Tests' },
  { href: '/notifications', icon: Bell, text: 'Notifications' },
];

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <nav className="mt-5 px-2">
        {navigationItems.map((item) => (
          <NavLink
            key={item.text}
            href={item.href}
            icon={item.icon}
            text={item.text}
            active={item.active}
          />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;