export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';
export type QrStyle = 'squares' | 'dots' | 'rounded';
export type QrFrameStyle = 'none' | 'box' | 'corners' | 'scan-me-bubble' | 'dots-frame';
export type ActivePage = 'dashboard' | 'analytics' | 'settings' | 'help';

export interface QrCustomizationState {
  fgColor: string;
  bgColor: string;
  gradient: {
    enabled: boolean;
    color1: string;
    color2: string;
  };
  logo: string | null;
  errorCorrectionLevel: ErrorCorrectionLevel;
  style: QrStyle;
  frameStyle: QrFrameStyle;
}

export enum QrType {
  URL = 'URL',
  Text = 'Text',
  WiFi = 'WiFi',
  Email = 'Email',
}
