
import React from 'react';
import { QrCode, LayoutDashboard, BarChart3, Settings, LifeBuoy } from 'lucide-react';

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean }> = ({ icon, label, active }) => (
  <a
    href="#"
    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
      active
        ? 'bg-accent-gradient text-white shadow-md'
        : 'hover:bg-white/10 text-secondary-text'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </a>
);

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-black/20 p-4 border-r border-white/10 hidden md:flex flex-col">
      <div className="flex items-center space-x-2 mb-10 p-2">
        <QrCode className="h-8 w-8 bg-accent-gradient p-1.5 rounded-lg text-white" />
        <h1 className="text-xl font-bold text-primary-text">QR Code Generator</h1>
      </div>
      <nav className="flex-1 flex flex-col space-y-2">
        <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
        <NavItem icon={<BarChart3 size={20} />} label="Analytics" />
        <NavItem icon={<Settings size={20} />} label="Settings" />
      </nav>
      <div>
        <NavItem icon={<LifeBuoy size={20} />} label="Help & Support" />
      </div>
    </aside>
  );
};