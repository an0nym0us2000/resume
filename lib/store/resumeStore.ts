import { create } from 'zustand';
import { ResumeData, ResumeStyle, SectionConfig } from '@/types/resume';

interface ResumeState {
  resumeData: ResumeData | null;
  style: ResumeStyle;
  templateId: string | null;
  sectionOrder: SectionConfig[];
  isPreviewMode: boolean;

  // Actions
  setResumeData: (data: ResumeData) => void;
  updateSection: <K extends keyof ResumeData>(
    section: K,
    data: ResumeData[K]
  ) => void;
  setStyle: (style: Partial<ResumeStyle>) => void;
  setTemplateId: (templateId: string) => void;
  setSectionOrder: (order: SectionConfig[]) => void;
  togglePreviewMode: () => void;
  reset: () => void;
}

const defaultStyle: ResumeStyle = {
  fontFamily: 'Inter',
  fontSize: 11,
  primaryColor: '#000000',
  secondaryColor: '#4B5563',
  lineHeight: 1.5,
  spacing: 'normal',
  headingStyle: 'uppercase',
};

const defaultSectionOrder: SectionConfig[] = [
  { id: '1', type: 'personalInfo', title: 'Personal Info', visible: true, order: 0 },
  { id: '2', type: 'summary', title: 'Professional Summary', visible: true, order: 1 },
  { id: '3', type: 'workExperience', title: 'Work Experience', visible: true, order: 2 },
  { id: '4', type: 'education', title: 'Education', visible: true, order: 3 },
  { id: '5', type: 'skills', title: 'Skills', visible: true, order: 4 },
  { id: '6', type: 'projects', title: 'Projects', visible: false, order: 5 },
  { id: '7', type: 'certifications', title: 'Certifications', visible: false, order: 6 },
  { id: '8', type: 'awards', title: 'Awards', visible: false, order: 7 },
  { id: '9', type: 'languages', title: 'Languages', visible: false, order: 8 },
];

const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
  },
  workExperience: [],
  education: [],
  skills: [],
};

export const useResumeStore = create<ResumeState>((set) => ({
  resumeData: defaultResumeData,
  style: defaultStyle,
  templateId: null,
  sectionOrder: defaultSectionOrder,
  isPreviewMode: false,

  setResumeData: (data) => set({ resumeData: data }),

  updateSection: (section, data) =>
    set((state) => ({
      resumeData: state.resumeData
        ? { ...state.resumeData, [section]: data }
        : { ...defaultResumeData, [section]: data },
    })),

  setStyle: (styleUpdate) =>
    set((state) => ({
      style: { ...state.style, ...styleUpdate },
    })),

  setTemplateId: (templateId) => set({ templateId }),

  setSectionOrder: (order) => set({ sectionOrder: order }),

  togglePreviewMode: () =>
    set((state) => ({ isPreviewMode: !state.isPreviewMode })),

  reset: () =>
    set({
      resumeData: defaultResumeData,
      style: defaultStyle,
      templateId: null,
      sectionOrder: defaultSectionOrder,
      isPreviewMode: false,
    }),
}));
