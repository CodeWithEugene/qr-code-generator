
import React, { useState, useCallback } from 'react';
import type { QrCustomizationState } from './types';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { QrCustomizer } from './components/QrCustomizer';
import { QrPreview } from './components/QrPreview';

const App: React.FC = () => {
  const [qrValue, setQrValue] = useState<string>('https://gemini.google.com/');
  const [customization, setCustomization] = useState<QrCustomizationState>({
    fgColor: '#FFFFFF',
    bgColor: '#121212',
    gradient: { enabled: true, color1: '#3B82F6', color2: '#8B5CF6' },
    logo: null,
    errorCorrectionLevel: 'M',
  });

  const handleCustomizationChange = useCallback((newState: Partial<QrCustomizationState>) => {
    setCustomization(prev => ({ ...prev, ...newState }));
  }, []);

  return (
    <div className="min-h-screen font-sans text-primary-text flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
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
        </main>
      </div>
    </div>
  );
};

export default App;
