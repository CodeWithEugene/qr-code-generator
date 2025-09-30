import React from 'react';
import { GlassCard } from './GlassCard';
import { LifeBuoy } from 'lucide-react';

export const HelpPlaceholder: React.FC = () => {
  return (
    <GlassCard className="h-full flex flex-col items-center justify-center text-center">
      <LifeBuoy size={48} className="text-teal-400 mb-4" />
      <h2 className="text-2xl font-bold text-primary-text mb-2">Help & Support</h2>
      <p className="text-secondary-text max-w-md">
        Find tutorials, read our documentation, or contact our support team. This feature is coming soon!
      </p>
    </GlassCard>
  );
};
