import React, { useRef, useLayoutEffect } from 'react';
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
  const { style, frameStyle, fgColor, bgColor } = customization;

  useLayoutEffect(() => {
    if (!qrRef.current) return;
    const svg = qrRef.current.querySelector('svg');
    if (!svg) return;
    
    // --- 1. Cleanup previous modifications ---
    svg.querySelectorAll('.qr-frame-group, .custom-qr-modules, .qr-content-wrapper').forEach(el => el.remove());

    const contentWrapperForUnwrap = svg.querySelector('.qr-content-wrapper');
    if (contentWrapperForUnwrap) {
        while (contentWrapperForUnwrap.firstChild) {
            svg.appendChild(contentWrapperForUnwrap.firstChild);
        }
        contentWrapperForUnwrap.remove();
    }
    
    const path = svg.querySelector('path');
    const bgRect = svg.querySelector('rect');
    if (!path || !bgRect) return;

    // Reset original elements
    path.style.visibility = 'visible';
    bgRect.setAttribute('fill', bgColor);
    svg.setAttribute('width', '256');
    svg.setAttribute('height', '256');
    svg.setAttribute('viewBox', '0 0 256 256');
    
    // --- 2. Apply Module Style ---
    if (style !== 'squares') {
        path.style.visibility = 'hidden';
        const pathData = path.getAttribute('d') || '';
        const modules = pathData.split('z').filter(s => s.startsWith('M'));
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.setAttribute('class', 'custom-qr-modules');
        group.setAttribute('fill', path.getAttribute('fill') || fgColor);

        modules.forEach(modulePath => {
            const commands = modulePath.substring(1).split(/[hv]/);
            if (commands.length < 2) return;
            const [x, y] = commands[0].trim().split(' ').map(Number);
            const size = Number(commands[1]);
            if (isNaN(x) || isNaN(y) || isNaN(size) || size <= 0) return;
            
            if (style === 'rounded') {
                const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                rect.setAttribute('x', String(x)); rect.setAttribute('y', String(y));
                rect.setAttribute('width', String(size)); rect.setAttribute('height', String(size));
                rect.setAttribute('rx', String(size * 0.3)); rect.setAttribute('ry', String(size * 0.3));
                group.appendChild(rect);
            } else if (style === 'dots') {
                const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                circle.setAttribute('cx', String(x + size / 2));
                circle.setAttribute('cy', String(y + size / 2));
                circle.setAttribute('r', String(size / 2));
                group.appendChild(circle);
            }
        });
        svg.appendChild(group);
    }
    
    // --- 3. Apply Frame Style ---
    if (frameStyle === 'none') return; // No frame, we're done

    // Setup for framing
    const PADDING = 20;
    const baseSize = 256;
    let newWidth = baseSize + PADDING * 2;
    let newHeight = baseSize + PADDING * 2;
    let qrX = PADDING;
    let qrY = PADDING;

    const contentWrapper = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    contentWrapper.setAttribute('class', 'qr-content-wrapper');
    Array.from(svg.children).forEach(child => contentWrapper.appendChild(child));
    svg.appendChild(contentWrapper);

    const frameGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    frameGroup.setAttribute('class', 'qr-frame-group');
    svg.insertBefore(frameGroup, contentWrapper);

    bgRect.setAttribute('fill', 'none'); // Hide original QR background

    // Draw specific frames
    if (frameStyle === 'box') {
        const frameRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        frameRect.setAttribute('x', String(PADDING / 2));
        frameRect.setAttribute('y', String(PADDING / 2));
        frameRect.setAttribute('width', String(baseSize + PADDING));
        frameRect.setAttribute('height', String(baseSize + PADDING));
        frameRect.setAttribute('rx', '16'); frameRect.setAttribute('ry', '16');
        frameRect.setAttribute('stroke', fgColor);
        frameRect.setAttribute('stroke-width', '4');
        frameRect.setAttribute('fill', 'none');
        frameGroup.appendChild(frameRect);
    } else if (frameStyle === 'corners') {
        const cornerLength = baseSize * 0.15;
        const strokeWidth = '8';
        const offset = PADDING / 2;
        const size = baseSize + PADDING;
        const paths = [
            `M ${offset + cornerLength},${offset} L ${offset},${offset} L ${offset},${offset + cornerLength}`, // TL
            `M ${size - cornerLength},${offset} L ${size},${offset} L ${size},${offset + cornerLength}`, // TR
            `M ${offset + cornerLength},${size} L ${offset},${size} L ${offset},${size - cornerLength}`, // BL
            `M ${size - cornerLength},${size} L ${size},${size} L ${size},${size - cornerLength}`, // BR
        ];
        paths.forEach(d => {
            const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            pathEl.setAttribute('d', d);
            pathEl.setAttribute('stroke', fgColor);
            pathEl.setAttribute('stroke-width', strokeWidth);
            pathEl.setAttribute('fill', 'none');
            pathEl.setAttribute('stroke-linecap', 'round');
            frameGroup.appendChild(pathEl);
        });
    } else if (frameStyle === 'dots-frame') {
        const dotRadius = 3;
        const dotSpacing = dotRadius * 3.5;
        const offset = PADDING / 2;
        const size = baseSize + PADDING;
        for (let i = offset; i <= size; i += dotSpacing) {
            // Top & Bottom
            const topDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            topDot.setAttribute('cx', String(i)); topDot.setAttribute('cy', String(offset)); topDot.setAttribute('r', String(dotRadius));
            const bottomDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            bottomDot.setAttribute('cx', String(i)); bottomDot.setAttribute('cy', String(size)); bottomDot.setAttribute('r', String(dotRadius));
            frameGroup.appendChild(topDot);
            frameGroup.appendChild(bottomDot);
        }
        for (let i = offset + dotSpacing; i < size; i += dotSpacing) {
            // Left & Right
             const leftDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
             leftDot.setAttribute('cx', String(offset)); leftDot.setAttribute('cy', String(i)); leftDot.setAttribute('r', String(dotRadius));
             const rightDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
             rightDot.setAttribute('cx', String(size)); rightDot.setAttribute('cy', String(i)); rightDot.setAttribute('r', String(dotRadius));
             frameGroup.appendChild(leftDot);
             frameGroup.appendChild(rightDot);
        }
        frameGroup.setAttribute('fill', fgColor);
    } else if (frameStyle === 'scan-me-bubble') {
        const BUBBLE_HEIGHT = 60;
        const BUBBLE_PADDING = 15;
        newHeight += BUBBLE_HEIGHT + BUBBLE_PADDING;
        qrY = PADDING + BUBBLE_HEIGHT + BUBBLE_PADDING;

        const qrBorder = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        qrBorder.setAttribute('x', String(qrX)); qrBorder.setAttribute('y', String(qrY));
        qrBorder.setAttribute('width', String(baseSize)); qrBorder.setAttribute('height', String(baseSize));
        qrBorder.setAttribute('rx', '16'); qrBorder.setAttribute('ry', '16');
        qrBorder.setAttribute('fill', bgColor);
        qrBorder.setAttribute('stroke', fgColor);
        qrBorder.setAttribute('stroke-width', '2');
        frameGroup.appendChild(qrBorder);

        const bubbleWidth = 180;
        const bubbleX = newWidth / 2 - bubbleWidth / 2;
        const bubbleY = PADDING;
        const pointerWidth = 20;
        const pointerHeight = 20;
        
        const bubblePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const d = `M${bubbleX+12},${bubbleY} h${bubbleWidth-24} a12,12 0 0 1 12,12 v${BUBBLE_HEIGHT-24} a12,12 0 0 1 -12,12 h-${(bubbleWidth-pointerWidth)/2-12} l-${pointerWidth/2},${pointerHeight} l-${pointerWidth/2},-${pointerHeight} h-${(bubbleWidth-pointerWidth)/2-12} a12,12 0 0 1 -12,-12 v-${BUBBLE_HEIGHT-24} a12,12 0 0 1 12,-12 z`;
        bubblePath.setAttribute('d', d.trim().replace(/\s+/g, ' '));
        bubblePath.setAttribute('fill', fgColor);
        frameGroup.appendChild(bubblePath);

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', String(newWidth / 2));
        text.setAttribute('y', String(bubbleY + BUBBLE_HEIGHT / 2 + 8));
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('font-family', 'Inter, sans-serif');
        text.setAttribute('font-size', '28');
        text.setAttribute('font-weight', '900');
        text.setAttribute('fill', bgColor);
        text.textContent = 'SCAN ME';
        frameGroup.appendChild(text);
    }

    // --- 4. Finalize SVG dimensions and position ---
    svg.setAttribute('width', String(newWidth));
    svg.setAttribute('height', String(newHeight));
    svg.setAttribute('viewBox', `0 0 ${newWidth} ${newHeight}`);
    contentWrapper.setAttribute('transform', `translate(${qrX}, ${qrY})`);

  }, [value, customization]);

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
            canvas.width = parseInt(svgElement.getAttribute('width') || '256') * 2;
            canvas.height = parseInt(svgElement.getAttribute('height') || '256') * 2;
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
      <div className="relative p-2 rounded-xl" ref={qrRef}>
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
