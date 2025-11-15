import { ModernTemplate } from '@/components/templates/ModernTemplate';
import { ClassicTemplate } from '@/components/templates/ClassicTemplate';
import { MinimalTemplate } from '@/components/templates/MinimalTemplate';
import { TwoColumnTemplate } from '@/components/templates/TwoColumnTemplate';
import { TemplateStyle } from '@/types/template';

export const templateRegistry = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  minimal: MinimalTemplate,
  'two-column': TwoColumnTemplate,
};

export const templateStyles: Record<string, TemplateStyle> = {
  modern: {
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
  },
  classic: {
    id: 'classic',
    name: 'Classic Professional',
    description: 'Traditional resume layout with serif fonts',
    isPremium: false,
    colors: {
      primary: '#1e293b',
      secondary: '#64748b',
      accent: '#0f172a',
      text: '#1e293b',
      background: '#ffffff',
    },
    fonts: {
      heading: 'Georgia',
      body: 'Georgia',
    },
    spacing: 'normal',
    layout: 'single-column',
  },
  minimal: {
    id: 'minimal',
    name: 'Minimal',
    description: 'Ultra-clean minimalist design',
    isPremium: false,
    colors: {
      primary: '#000000',
      secondary: '#666666',
      accent: '#000000',
      text: '#000000',
      background: '#ffffff',
    },
    fonts: {
      heading: 'Helvetica',
      body: 'Helvetica',
    },
    spacing: 'normal',
    layout: 'single-column',
  },
  'two-column': {
    id: 'two-column',
    name: 'Two Column',
    description: 'Sidebar layout with skills and contact',
    isPremium: true,
    colors: {
      primary: '#0ea5e9',
      secondary: '#64748b',
      accent: '#06b6d4',
      text: '#1e293b',
      background: '#f8fafc',
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
    },
    spacing: 'normal',
    layout: 'two-column',
  },
};

export function getTemplate(templateId: string = 'modern') {
  return templateRegistry[templateId as keyof typeof templateRegistry] || ModernTemplate;
}

export function getTemplateStyle(templateId: string = 'modern') {
  return templateStyles[templateId] || templateStyles.modern;
}

export function getAllTemplates() {
  return Object.values(templateStyles);
}
