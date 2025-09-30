
export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

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
}

export enum QrType {
  URL = 'URL',
  Text = 'Text',
  WiFi = 'WiFi',
  Email = 'Email',
}
