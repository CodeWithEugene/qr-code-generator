import React from 'react';
import { QrCode, LayoutDashboard, BarChart3, Settings, LifeBuoy } from 'lucide-react';
import type { ActivePage } from '../types';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full space-x-3 p-3 rounded-lg transition-colors duration-200 text-left ${
      active
        ? 'bg-accent-gradient text-white shadow-md'
        : 'hover:bg-white/10 text-secondary-text'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

interface SidebarProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate }) => {
  const navItems: { id: ActivePage; label: string; icon: React.FC<any> }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-black/20 p-4 border-r border-white/10 hidden md:flex flex-col">
      <div className="flex items-center space-x-2 mb-10 p-2">
        <QrCode className="h-8 w-8 bg-accent-gradient p-1.5 rounded-lg text-white" />
        <h1 className="text-xl font-bold text-primary-text">QR Code Generator</h1>
      </div>
      <nav className="flex-1 flex flex-col space-y-2">
        {navItems.map(item => {
          const Icon = item.icon;
          return (
            <NavItem 
              key={item.id}
              icon={<Icon size={20} />} 
              label={item.label} 
              active={activePage === item.id}
              onClick={() => onNavigate(item.id)}
            />
          );
        })}
      </nav>
      <div>
        <NavItem 
          icon={<LifeBuoy size={20} />} 
          label="Help & Support" 
          active={activePage === 'help'}
          onClick={() => onNavigate('help')}
        />
      </div>
    </aside>
  );
};
