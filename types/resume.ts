export interface PersonalInfo {
  fullName: string;
  email: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  website?: string;
  portfolio?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  bullets: string[];
  description?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  gpa?: string;
  honors?: string[];
  relevant?: string[];
}

export interface Skill {
  id: string;
  category: string;
  items: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies?: string[];
  url?: string;
  github?: string;
  startDate?: string;
  endDate?: string;
  bullets?: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date?: string;
  expiryDate?: string;
  credentialId?: string;
  url?: string;
}

export interface Award {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  description?: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'native' | 'fluent' | 'professional' | 'intermediate' | 'basic';
}

export interface CustomSection {
  id: string;
  title: string;
  items: Array<{
    id: string;
    title?: string;
    description?: string;
    bullets?: string[];
    date?: string;
  }>;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary?: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects?: Project[];
  certifications?: Certification[];
  awards?: Award[];
  languages?: Language[];
  customSections?: CustomSection[];
}

export interface ResumeStyle {
  fontFamily: string;
  fontSize: number;
  primaryColor: string;
  secondaryColor: string;
  accentColor?: string;
  lineHeight: number;
  spacing: 'compact' | 'normal' | 'relaxed';
  headingStyle: 'uppercase' | 'capitalize' | 'normal';
}

export interface ResumeTemplate {
  id: string;
  name: string;
  description?: string;
  thumbnail?: string;
  category?: string;
  layout: 'single-column' | 'two-column' | 'modern' | 'classic';
  isAtsOptimized: boolean;
  isPremium: boolean;
}

export interface Resume {
  id: string;
  userId: string;
  title: string;
  data: ResumeData;
  templateId?: string;
  style?: ResumeStyle;
  atsScore?: number;
  lastAtsCheck?: Date;
  keywords?: string[];
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AtsAnalysisResult {
  score: number;
  keywords: {
    matched: string[];
    missing: string[];
  };
  suggestions: string[];
  weakSections: {
    section: string;
    reason: string;
    suggestion: string;
  }[];
  impactScore: {
    [section: string]: number;
  };
}

export type SectionType =
  | 'personalInfo'
  | 'summary'
  | 'workExperience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certifications'
  | 'awards'
  | 'languages'
  | 'custom';

export interface SectionConfig {
  id: string;
  type: SectionType;
  title: string;
  visible: boolean;
  order: number;
}
