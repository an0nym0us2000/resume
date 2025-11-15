import { ResumeData } from './resume';

export interface TemplateStyle {
  id: string;
  name: string;
  description: string;
  isPremium: boolean;
  thumbnail?: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    background: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  spacing: 'compact' | 'normal' | 'relaxed';
  layout: 'single-column' | 'two-column' | 'modern' | 'creative';
}

export interface TemplateProps {
  data: ResumeData;
  style?: TemplateStyle;
}

export const defaultTemplateStyle: TemplateStyle = {
  id: 'modern',
  name: 'Modern Professional',
  description: 'Clean and modern design with accent colors',
  isPremium: false,
  colors: {
    primary: '#2563eb',
    secondary: '#64748b',
    accent: '#3b82f6',
    text: '#1e293b',
    background: '#ffffff',
  },
  fonts: {
    heading: 'Inter',
    body: 'Inter',
  },
  spacing: 'normal',
  layout: 'single-column',
};
