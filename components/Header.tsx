
import React from 'react';
import { Bell, User } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="h-16 flex-shrink-0 flex items-center justify-end px-8 border-b border-white/10">
       <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
          <Bell size={20} className="text-secondary-text" />
        </button>
        <div className="w-8 h-8 bg-accent-gradient rounded-full flex items-center justify-center">
            <User size={18} className="text-white"/>
        </div>
       </div>
    </header>
  );
};
