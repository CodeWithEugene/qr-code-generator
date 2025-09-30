import React, { useState, useCallback, ChangeEvent } from 'react';
import type { QrCustomizationState, ErrorCorrectionLevel, QrStyle, QrFrameStyle } from '../types';
import { QrType } from '../types';
import { GlassCard } from './GlassCard';
import { Sparkles, Upload, Link, Type, Wifi, Mail, Square, Circle, AppWindow, XSquare, Move, MessageSquare, Grid } from 'lucide-react';
import { getAiSuggestion } from '../services/geminiService';

interface QrCustomizerProps {
  onQrValueChange: (value: string) => void;
  onCustomizationChange: (newState: Partial<QrCustomizationState>) => void;
  initialQrValue: string;
  customization: QrCustomizationState;
}

const TabButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
    <button onClick={onClick} className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${active ? 'bg-accent-gradient text-white' : 'bg-white/5 hover:bg-white/10 text-secondary-text'}`}>
        {children}
    </button>
);

const LabeledInput: React.FC<{ label: string; value: string; onChange: (e: ChangeEvent<HTMLInputElement>) => void; placeholder?: string }> = ({label, value, onChange, placeholder}) => (
    <div>
        <label className="block text-sm font-medium text-secondary-text mb-1">{label}</label>
        <input type="text" value={value} onChange={onChange} placeholder={placeholder} className="w-full bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-primary-text focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow" />
    </div>
);


export const QrCustomizer: React.FC<QrCustomizerProps> = ({ onQrValueChange, onCustomizationChange, initialQrValue, customization }) => {
  const [activeTab, setActiveTab] = useState('input');
  const [qrType, setQrType] = useState<QrType>(QrType.URL);
  const [inputValue, setInputValue] = useState(initialQrValue);
  
  const [aiPrompt, setAiPrompt] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleAiSuggest = async () => {
    if (!aiPrompt) return;
    setIsAiLoading(true);
    try {
      const suggestion = await getAiSuggestion(aiPrompt);
      setInputValue(suggestion);
      onQrValueChange(suggestion);
    } catch (error) {
      console.error("AI Suggestion Error:", error);
      alert("Failed to get AI suggestion. Please check the console.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onCustomizationChange({ logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const renderInputFields = () => {
    switch(qrType) {
        case QrType.URL:
            return <LabeledInput label="Website URL" value={inputValue} onChange={e => { setInputValue(e.target.value); onQrValueChange(e.target.value); }} placeholder="https://example.com" />;
        case QrType.Text:
            return (
                 <div>
                    <label className="block text-sm font-medium text-secondary-text mb-1">Text</label>
                    <textarea value={inputValue} onChange={e => { setInputValue(e.target.value); onQrValueChange(e.target.value); }} placeholder="Enter your text here" rows={4} className="w-full bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-primary-text focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow" />
                </div>
            )
        default:
            return <LabeledInput label="Content" value={inputValue} onChange={e => { setInputValue(e.target.value); onQrValueChange(e.target.value); }} placeholder="Enter content..." />;
    }
  }

  const QR_TYPES = [
    { type: QrType.URL, icon: Link, label: 'URL' },
    { type: QrType.Text, icon: Type, label: 'Text' },
    { type: QrType.WiFi, icon: Wifi, label: 'Wi-Fi' },
    { type: QrType.Email, icon: Mail, label: 'Email' }
  ];
  
  const STYLE_OPTIONS: { style: QrStyle; label: string; icon: React.FC<any> }[] = [
    { style: 'squares', label: 'Squares', icon: Square },
    { style: 'rounded', label: 'Rounded', icon: AppWindow },
    { style: 'dots', label: 'Dots', icon: Circle },
  ];

  const FRAME_OPTIONS: { style: QrFrameStyle; label: string; icon: React.FC<any> }[] = [
    { style: 'none', label: 'None', icon: XSquare },
    { style: 'box', label: 'Box', icon: Square },
    { style: 'corners', label: 'Corners', icon: Move },
    { style: 'scan-me-bubble', label: 'Scan Me', icon: MessageSquare },
    { style: 'dots-frame', label: 'Dots', icon: Grid },
  ];

  return (
    <GlassCard className="h-full flex flex-col">
      <div className="flex space-x-2 border-b border-white/10 pb-4 mb-4">
        <TabButton active={activeTab === 'input'} onClick={() => setActiveTab('input')}>Content</TabButton>
        <TabButton active={activeTab === 'style'} onClick={() => setActiveTab('style')}>Customize</TabButton>
        <TabButton active={activeTab === 'ai'} onClick={() => setActiveTab('ai')}>AI Assist</TabButton>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2 -mr-2 space-y-6">
        {activeTab === 'input' && (
          <div>
            <h3 className="font-semibold mb-3">QR Code Type</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                {QR_TYPES.map(item => {
                    const Icon = item.icon;
                    const isActive = qrType === item.type;
                    return (
                        <button key={item.type} onClick={() => setQrType(item.type)} className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${isActive ? 'border-blue-500 bg-blue-500/10' : 'border-transparent bg-white/5 hover:bg-white/10'}`}>
                            <Icon size={24} className={isActive ? 'text-blue-400' : 'text-secondary-text'} />
                            <span className={`mt-1 text-xs font-medium ${isActive ? 'text-primary-text' : 'text-secondary-text'}`}>{item.label}</span>
                        </button>
                    )
                })}
            </div>
            {renderInputFields()}
          </div>
        )}

        {activeTab === 'style' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Colors</h3>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <label className="text-sm text-secondary-text">Foreground</label>
                  <input type="color" value={customization.fgColor} onChange={e => onCustomizationChange({fgColor: e.target.value})} className="w-full h-10 p-1 bg-transparent border-none rounded-lg" />
                </div>
                <div className="flex-1">
                  <label className="text-sm text-secondary-text">Background</label>
                  <input type="color" value={customization.bgColor} onChange={e => onCustomizationChange({bgColor: e.target.value})} className="w-full h-10 p-1 bg-transparent border-none rounded-lg" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Module Style</h3>
              <div className="flex space-x-2">
                {STYLE_OPTIONS.map(({ style, label, icon: Icon }) => (
                  <button 
                    key={style} 
                    onClick={() => onCustomizationChange({ style })} 
                    className={`w-full py-2 text-sm font-medium rounded-md transition-all flex items-center justify-center space-x-2 ${customization.style === style ? 'bg-accent-gradient text-white' : 'bg-white/5 hover:bg-white/10 text-secondary-text'}`}
                  >
                    <Icon size={16} />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Frame Style</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {FRAME_OPTIONS.map(({ style, label, icon: Icon }) => (
                  <button 
                    key={style} 
                    onClick={() => onCustomizationChange({ frameStyle: style })}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${customization.frameStyle === style ? 'border-blue-500 bg-blue-500/10' : 'border-transparent bg-white/5 hover:bg-white/10'}`}>
                     <Icon size={24} className={customization.frameStyle === style ? 'text-blue-400' : 'text-secondary-text'} />
                    <span className={`mt-1 text-xs font-medium ${customization.frameStyle === style ? 'text-primary-text' : 'text-secondary-text'}`}>{label}</span>
                  </button>
                ))}
              </div>
            </div>

             <div>
              <h3 className="font-semibold mb-3">Logo</h3>
              <label htmlFor="logo-upload" className="w-full flex items-center justify-center px-4 py-3 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:bg-white/5 transition-colors">
                <Upload size={20} className="mr-2 text-secondary-text" />
                <span className="text-sm text-secondary-text">{customization.logo ? "Change Logo" : "Upload Logo"}</span>
              </label>
              <input id="logo-upload" type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
              {customization.logo && <button onClick={() => onCustomizationChange({logo: null})} className="text-xs text-red-400 mt-2">Remove Logo</button>}
            </div>

            <div>
              <h3 className="font-semibold mb-3">Error Correction</h3>
              <div className="flex space-x-2">
                {(['L', 'M', 'Q', 'H'] as ErrorCorrectionLevel[]).map(level => (
                  <button key={level} onClick={() => onCustomizationChange({errorCorrectionLevel: level})} className={`w-full py-2 text-sm font-medium rounded-md transition-all ${customization.errorCorrectionLevel === level ? 'bg-accent-gradient text-white' : 'bg-white/5 hover:bg-white/10 text-secondary-text'}`}>
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'ai' && (
          <div className="space-y-4">
            <h3 className="font-semibold">AI Assistant</h3>
            <p className="text-sm text-secondary-text">Describe the QR code you want, and let AI generate the content for you.</p>
            <textarea value={aiPrompt} onChange={e => setAiPrompt(e.target.value)} placeholder="e.g., a Wi-Fi QR code for my network 'MyCafe' with password 'secret123'" rows={4} className="w-full bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-primary-text focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow" />
            <button onClick={handleAiSuggest} disabled={isAiLoading} className="w-full flex items-center justify-center bg-accent-gradient-alt text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
              {isAiLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Sparkles size={18} className="mr-2" />
                  Generate Content
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </GlassCard>
  );
};
