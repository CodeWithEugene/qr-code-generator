import React, { useState, useCallback } from 'react';
import type { QrCustomizationState, ActivePage } from './types';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { QrCustomizer } from './components/QrCustomizer';
import { QrPreview } from './components/QrPreview';
import { AnalyticsPlaceholder } from './components/AnalyticsPlaceholder';
import { SettingsPlaceholder } from './components/SettingsPlaceholder';
import { HelpPlaceholder } from './components/HelpPlaceholder';

const App: React.FC = () => {
  const [qrValue, setQrValue] = useState<string>('https://gemini.google.com/');
  const [customization, setCustomization] = useState<QrCustomizationState>({
    fgColor: '#FFFFFF',
    bgColor: '#121212',
    gradient: { enabled: true, color1: '#3B82F6', color2: '#8B5CF6' },
    logo: null,
    errorCorrectionLevel: 'M',
    style: 'squares',
    frameStyle: 'none',
  });
  const [activePage, setActivePage] = useState<ActivePage>('dashboard');

  const handleCustomizationChange = useCallback((newState: Partial<QrCustomizationState>) => {
    setCustomization(prev => ({ ...prev, ...newState }));
  }, []);

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
            <div className="lg:col-span-1">
              <QrCustomizer
                onQrValueChange={setQrValue}
                onCustomizationChange={handleCustomizationChange}
                initialQrValue={qrValue}
                customization={customization}
              />
            </div>
            <div className="lg:col-span-2">
              <QrPreview value={qrValue} customization={customization} />
            </div>
          </div>
        );
      case 'analytics':
        return <AnalyticsPlaceholder />;
      case 'settings':
        return <SettingsPlaceholder />;
      case 'help':
        return <HelpPlaceholder />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen font-sans text-primary-text flex">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {renderContent()}
        </main>
        <footer className="text-center p-4 text-secondary-text text-sm border-t border-white/10">
          Made with ❤️ by <a href="https://codewitheugene.top/" target="_blank" rel="noopener noreferrer" className="text-primary-text font-semibold hover:text-blue-400 transition-colors">Eugenius</a>.
        </footer>
      </div>
    </div>
  );
};

export default App;
