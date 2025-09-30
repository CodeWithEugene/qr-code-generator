import React from 'react';
import { GlassCard } from './GlassCard';
import { Settings } from 'lucide-react';

export const SettingsPlaceholder: React.FC = () => {
  return (
    <GlassCard className="h-full flex flex-col items-center justify-center text-center">
      <Settings size={48} className="text-purple-400 mb-4" />
      <h2 className="text-2xl font-bold text-primary-text mb-2">Settings</h2>
      <p className="text-secondary-text max-w-md">
        Manage your account, API keys, and application preferences here. This feature is coming soon!
      </p>
    </GlassCard>
  );
};
