import React from 'react';
import { GlassCard } from './GlassCard';
import { BarChart3 } from 'lucide-react';

export const AnalyticsPlaceholder: React.FC = () => {
  return (
    <GlassCard className="h-full flex flex-col items-center justify-center text-center">
      <BarChart3 size={48} className="text-blue-400 mb-4" />
      <h2 className="text-2xl font-bold text-primary-text mb-2">Analytics</h2>
      <p className="text-secondary-text max-w-md">
        Track scan counts, locations, and user devices. This feature is coming soon!
      </p>
    </GlassCard>
  );
};
