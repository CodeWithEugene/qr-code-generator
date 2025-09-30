import React, { useRef } from 'react';
// Fix: Use named import for QRCodeSVG as default import is causing issues.
import { QRCodeSVG } from 'qrcode.react';
import { Download } from 'lucide-react';
import type { QrCustomizationState } from '../types';
import { GlassCard } from './GlassCard';

interface QrPreviewProps {
  value: string;
  customization: QrCustomizationState;
}

export const QrPreview: React.FC<QrPreviewProps> = ({ value, customization }) => {
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQR = (format: 'svg' | 'png') => {
    if (!qrRef.current) return;
    const svgElement = qrRef.current.querySelector('svg');
    if (!svgElement) return;

    const svgString = new XMLSerializer().serializeToString(svgElement);
    
    if (format === 'svg') {
        const blob = new Blob([svgString], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'qrcode.svg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } else if (format === 'png') {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        const img = new Image();
        const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);
        
        img.onload = () => {
            canvas.width = img.width * 2; // for higher resolution
            canvas.height = img.height * 2;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            const pngUrl = canvas.toDataURL('image/png');
            
            const a = document.createElement('a');
            a.href = pngUrl;
            a.download = 'qrcode.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        };
        img.src = url;
    }
  };


  const qrCodeProps = {
    value,
    size: 256,
    bgColor: customization.bgColor,
    fgColor: customization.fgColor,
    level: customization.errorCorrectionLevel,
    imageSettings: customization.logo
      ? {
          src: customization.logo,
          height: 48,
          width: 48,
          excavate: true,
        }
      : undefined,
  };

  return (
    <GlassCard className="h-full flex flex-col items-center justify-center transition-all duration-300 hover:border-white/20 transform hover:scale-[1.01] hover:shadow-2xl">
      <div className="relative p-6 bg-white/10 rounded-xl" ref={qrRef}>
        {/* Fix: Use QRCodeSVG component instead of generic QRCode. */}
        <QRCodeSVG {...qrCodeProps} />
      </div>

      <div className="mt-8 flex space-x-4">
        <button onClick={() => downloadQR('png')} className="bg-accent-gradient text-white font-semibold py-3 px-6 rounded-lg flex items-center space-x-2 hover:shadow-lg hover:shadow-blue-500/30 transition-shadow">
          <Download size={18} />
          <span>Download PNG</span>
        </button>
        <button onClick={() => downloadQR('svg')} className="bg-white/10 text-primary-text font-semibold py-3 px-6 rounded-lg flex items-center space-x-2 hover:bg-white/20 transition-colors">
          <Download size={18} />
          <span>Download SVG</span>
        </button>
      </div>
    </GlassCard>
  );
};
